from typing import List
from pydantic import BaseModel, Field


# Define Pydantic models for structured output
class Question(BaseModel):
    question: str
    answers: List[str]
    correct_answer: str


class MCQResponse(BaseModel):
    questions: List[Question] = Field(
        ..., description="List of multiple-choice questions."
    )
