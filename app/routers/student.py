from fastapi import APIRouter, Request, Form, Depends, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlmodel import Session, select
from app.database import get_session
from app.models import Session as SessionModel, Student, Phrase, Submission
import random

router = APIRouter(prefix="/session", tags=["student"])
templates = Jinja2Templates(directory="app/templates")


@router.get("/join", response_class=HTMLResponse)
async def join_session_page(request: Request):
    return templates.TemplateResponse("pages/student/join.html", {"request": request})


@router.post("/join")
async def join_session(
    pin: str = Form(...),
    name: str = Form(...),
    db: Session = Depends(get_session)
):
    session = db.exec(select(SessionModel).where(SessionModel.pin == pin)).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    student = Student(name=name, session_id=session.id)
    db.add(student)
    db.commit()
    db.refresh(student)
    
    return RedirectResponse(url=f"/session/{pin}?student_id={student.id}", status_code=303)


@router.get("/{pin}", response_class=HTMLResponse)
async def session_interface(
    request: Request, 
    pin: str,
    student_id: int,
    db: Session = Depends(get_session)
):
    session = db.exec(select(SessionModel).where(SessionModel.pin == pin)).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    student = db.get(Student, student_id)
    phrases = db.exec(select(Phrase).where(Phrase.session_id == session.id)).all()
    
    return templates.TemplateResponse(
        "pages/student/session.html", 
        {
            "request": request, 
            "session": session,
            "student": student,
            "phrases": phrases
        }
    )


@router.get("/{pin}/leaderboard", response_class=HTMLResponse)
async def leaderboard(
    request: Request, 
    pin: str,
    db: Session = Depends(get_session)
):
    session = db.exec(select(SessionModel).where(SessionModel.pin == pin)).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    students = db.exec(
        select(Student)
        .where(Student.session_id == session.id)
        .order_by(Student.score.desc())
    ).all()
    
    return templates.TemplateResponse(
        "pages/student/leaderboard.html", 
        {"request": request, "session": session, "students": students}
    )


@router.post("/{pin}/submit")
async def submit_answer(
    pin: str,
    phrase_id: int = Form(...),
    answer: str = Form(...),
    student_id: int = Form(...),
    db: Session = Depends(get_session)
):
    phrase = db.get(Phrase, phrase_id)
    student = db.get(Student, student_id)
    
    is_correct = answer.lower().strip() == phrase.text.lower().strip()
    points = random.randint(5, 15) if is_correct else 0
    
    submission = Submission(
        student_id=student_id,
        phrase_id=phrase_id,
        answer=answer,
        is_correct=is_correct,
        points_earned=points
    )
    
    if is_correct:
        student.score += points
    
    db.add(submission)
    db.commit()
    
    return {"success": True, "is_correct": is_correct, "points": points}
