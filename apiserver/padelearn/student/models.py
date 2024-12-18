from django.db import models

from padelearn.core.models import BaseModel
from padelearn.account.models import User
from padelearn.program.models import Program


class StudentRegistered(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Student Registered"
        verbose_name_plural = "Students Registered"
        db_table = "students_registered"

    def __str__(self):
        return str(self.user.username)
