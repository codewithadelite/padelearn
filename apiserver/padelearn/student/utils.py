from datetime import datetime
from django.db.models import QuerySet

from padelearn.account.models import User


def _generate_student_username(first_name: str, last_name: str):
    return first_name[:3].lower() + last_name[:3].lower() + str(datetime.now().year)


def _generate_student_password(first_name: str, last_name: str):
    return first_name[:3].lower() + last_name[:3].lower() + str(datetime.now().year)


def register_student(
    first_name: str, last_name: str, email: str, date_of_birth: datetime
) -> QuerySet:
    return User.objects.create_user(
        username=_generate_student_username(first_name, last_name),
        email=email,
        first_name=first_name,
        last_name=last_name,
        date_of_birth=date_of_birth,
        password=_generate_student_password(first_name, last_name),
        is_student=True,
        is_password_autoset=True,
    )
