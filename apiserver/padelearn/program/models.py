from django.db import models
from padelearn.core.models import BaseModel


class Program(BaseModel):
    image = models.ImageField(upload_to="images/programs", null=True, blank=True)
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        verbose_name = "Program"
        verbose_name_plural = "Programs"
        db_table = "programs"

    def __str__(self) -> str:
        return str(self.name)
