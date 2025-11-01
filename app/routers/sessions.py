from fastapi import APIRouter, Request, Form, Depends
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlmodel import Session, select
from app.database import get_session
from app.models import Session as SessionModel, Phrase
import random
import string

router = APIRouter(prefix="/sessions", tags=["sessions"])
templates = Jinja2Templates(directory="app/templates")


def generate_pin(length=6):
    return ''.join(random.choices(string.digits, k=length))


@router.post("/create")
async def create_session(
    title: str = Form(...),
    description: str = Form(None),
    db: Session = Depends(get_session)
):
    pin = generate_pin()
    
    while db.exec(select(SessionModel).where(SessionModel.pin == pin)).first():
        pin = generate_pin()
    
    session = SessionModel(
        pin=pin,
        title=title,
        description=description,
        teacher_id=1
    )
    
    db.add(session)
    db.commit()
    db.refresh(session)
    
    sample_phrases = [
        "Hola, ¿cómo estás?",
        "Buenos días",
        "Gracias",
        "Por favor",
        "¿Dónde está el baño?"
    ]
    
    for idx, phrase_text in enumerate(sample_phrases):
        phrase = Phrase(
            session_id=session.id,
            text=phrase_text,
            language="es",
            order=idx + 1
        )
        db.add(phrase)
    
    db.commit()
    
    return RedirectResponse(url="/teacher/dashboard", status_code=303)


@router.post("/{session_id}/toggle")
async def toggle_session(session_id: int, db: Session = Depends(get_session)):
    session = db.get(SessionModel, session_id)
    
    if session.status == "active":
        session.status = "paused"
    else:
        session.status = "active"
    
    db.commit()
    
    return {"status": session.status}
