from django.db import models

from padelearn.core.models import BaseModel
from padelearn.course.models import Course, Material


class Question(BaseModel):
    question = models.CharField(max_length=255)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    material = models.ForeignKey(Material, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name = "Question"
        verbose_name_plural = "Questions"
        db_table = "questions"

    def __str__(self) -> str:
        return str(self.question)


class QuestionAnswer(BaseModel):
    answer = models.CharField(max_length=255)
    is_correct_answer = models.BooleanField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Question Answer"
        verbose_name_plural = "Question Answers"
        db_table = "questions_answers"

    def __str__(self) -> str:
        return str(self.answer)
