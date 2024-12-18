import os
from django.db import models

from padelearn.core.models import BaseModel
from padelearn.program.models import Program


class Course(BaseModel):
    image = models.ImageField(upload_to="images/courses", null=True, blank=True)
    name = models.CharField(max_length=255)
    program = models.ForeignKey(Program, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Course"
        verbose_name_plural = "Courses"
        db_table = "courses"

    def __str__(self) -> str:
        return str(self.name)


class Material(BaseModel):
    name = models.CharField(max_length=255)
    document = models.FileField(upload_to="course_materials/")
    generate_quiz = models.BooleanField(default=False)
    is_quiz_generated = models.BooleanField(default=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Material"
        verbose_name_plural = "Materials"
        db_table = "materials"

    def __str__(self) -> str:
        return str(self.name)

    def delete(self, *args, **kwargs):
        if self.document:
            if os.path.isfile(self.document.path):
                os.remove(self.document.path)

        super().delete(*args, **kwargs)
