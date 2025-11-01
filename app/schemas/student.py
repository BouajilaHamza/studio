from pydantic import BaseModel, Field

class JoinForm(BaseModel):
    pin: str = Field(..., min_length=6, max_length=6)
    name: str = Field(..., min_length=1, max_length=50)

class SubmissionForm(BaseModel):
    phrase_id: int
    answer: str
    student_id: int
