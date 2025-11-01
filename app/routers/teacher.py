from fastapi import APIRouter, Request, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlmodel import Session, select
from app.database import get_session
from app.models import Session as SessionModel, Student, Submission

router = APIRouter(prefix="/teacher", tags=["teacher"])
templates = Jinja2Templates(directory="app/templates")


@router.get("/dashboard", response_class=HTMLResponse)
async def dashboard(request: Request, db: Session = Depends(get_session)):
    sessions = db.exec(select(SessionModel)).all()
    return templates.TemplateResponse(
        "pages/teacher/dashboard.html", 
        {"request": request, "sessions": sessions}
    )


@router.get("/dashboard/analytics", response_class=HTMLResponse)
async def analytics(request: Request, db: Session = Depends(get_session)):
    sessions = db.exec(select(SessionModel)).all()
    
    analytics_data = []
    for session in sessions:
        students = db.exec(select(Student).where(Student.session_id == session.id)).all()
        total_students = len(students)
        avg_score = sum(s.score for s in students) / total_students if total_students > 0 else 0
        
        analytics_data.append({
            "session": session,
            "total_students": total_students,
            "avg_score": avg_score
        })
    
    return templates.TemplateResponse(
        "pages/teacher/analytics.html", 
        {"request": request, "analytics": analytics_data}
    )


@router.get("/dashboard/history", response_class=HTMLResponse)
async def history(request: Request, db: Session = Depends(get_session)):
    sessions = db.exec(
        select(SessionModel).order_by(SessionModel.created_at.desc())
    ).all()
    
    return templates.TemplateResponse(
        "pages/teacher/history.html", 
        {"request": request, "sessions": sessions}
    )
