from pydantic import BaseModel, EmailStr, Field

class LoginForm(BaseModel):
    email: EmailStr
    password: str

class SignupForm(BaseModel):
    full_name: str
    email: EmailStr
    password: str = Field(..., min_length=8, description="Password must be at least 8 characters long.")
