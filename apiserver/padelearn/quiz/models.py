from django.db import models

from padelearn.core.models import BaseModel
from padelearn.account.models import User
from padelearn.course.models import Course
from padelearn.question.models import Question, QuestionAnswer


class Quiz(BaseModel):
    title = models.CharField(max_length=200)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Quiz"
        verbose_name_plural = "Quizes"
        db_table = "quizes"

    def __str__(self) -> str:
        return str(self.title)


class QuizAnswer(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ForeignKey(QuestionAnswer, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Quiz Answer"
        verbose_name_plural = "Quiz Answers"
        db_table = "quiz_answers"

    def __str__(self) -> str:
        return str(f"{self.question} - {self.answer}")
