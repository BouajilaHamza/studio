from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    TEACHER = "teacher"
    STUDENT = "student"


class SessionStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    PAUSED = "paused"


class User(SQLModel, table=True):
    __tablename__ = "users"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    full_name: str
    role: UserRole
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    sessions: List["Session"] = Relationship(back_populates="teacher")


class Session(SQLModel, table=True):
    __tablename__ = "sessions"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    pin: str = Field(unique=True, index=True)
    title: str
    description: Optional[str] = None
    status: SessionStatus = Field(default=SessionStatus.ACTIVE)
    teacher_id: int = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    started_at: Optional[datetime] = None
    ended_at: Optional[datetime] = None
    
    teacher: User = Relationship(back_populates="sessions")
    students: List["Student"] = Relationship(back_populates="session")
    phrases: List["Phrase"] = Relationship(back_populates="session")


class Student(SQLModel, table=True):
    __tablename__ = "students"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    session_id: int = Field(foreign_key="sessions.id")
    score: int = Field(default=0)
    joined_at: datetime = Field(default_factory=datetime.utcnow)
    
    session: Session = Relationship(back_populates="students")
    submissions: List["Submission"] = Relationship(back_populates="student")


class Phrase(SQLModel, table=True):
    __tablename__ = "phrases"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: int = Field(foreign_key="sessions.id")
    text: str
    language: str = Field(default="es")
    order: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    session: Session = Relationship(back_populates="phrases")
    submissions: List["Submission"] = Relationship(back_populates="phrase")


class Submission(SQLModel, table=True):
    __tablename__ = "submissions"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="students.id")
    phrase_id: int = Field(foreign_key="phrases.id")
    answer: str
    is_correct: bool = Field(default=False)
    points_earned: int = Field(default=0)
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    
    student: Student = Relationship(back_populates="submissions")
    phrase: Phrase = Relationship(back_populates="submissions")


class AnalyticsSnapshot(SQLModel, table=True):
    __tablename__ = "analytics_snapshots"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: int = Field(foreign_key="sessions.id")
    total_students: int
    avg_score: float
    completion_rate: float
    snapshot_at: datetime = Field(default_factory=datetime.utcnow)


class Incentive(SQLModel, table=True):
    __tablename__ = "incentives"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    student_id: int = Field(foreign_key="students.id")
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
