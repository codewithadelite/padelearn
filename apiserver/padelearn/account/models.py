from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin

from padelearn.core.models import BaseModel
from padelearn.program.models import Program
from padelearn.course.models import Course


class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    date_of_birth = models.DateField(null=True, blank=True)
    username = models.CharField(max_length=128, unique=True)
    email = models.EmailField(unique=True)

    # the is' es
    is_admin = models.BooleanField(default=False)
    is_trainer = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_managed = models.BooleanField(default=False)
    is_password_expired = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_password_autoset = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        db_table = "users"

    def __str__(self) -> str:
        return f"{self.username} "

    def save(self, *args, **kwargs):
        self.email = self.email.lower().strip()

        if self.is_superuser:
            self.is_staff = True

        super(User, self).save(*args, **kwargs)


class TrainerPermission(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    program = models.ForeignKey(
        Program, on_delete=models.CASCADE, null=True, blank=True
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = "Trainer Permission"
        verbose_name_plural = "Trainer Permissions"
        db_table = "trainers_permissions"

    def __str__(self) -> str:
        return str(f"{self.user.username}")
