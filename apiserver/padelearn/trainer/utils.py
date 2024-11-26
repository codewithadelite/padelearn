from typing import List, Optional
from django.shortcuts import get_object_or_404
from datetime import datetime

from django.db.models import QuerySet

from padelearn.account.models import User, TrainerPermission
from padelearn.program.models import Program
from padelearn.course.models import Course


def get_trainer_by_id(trainer_id: int) -> User:
    return get_object_or_404(User, pk=trainer_id, is_trainer=True)


def get_trainers_list() -> List[User]:
    return User.objects.filter(is_trainer=True)


def get_trainer_permissions(trainer: User) -> QuerySet[TrainerPermission]:
    return (
        TrainerPermission.objects.select_related("program")
        .select_related("course")
        .filter(user=trainer)
    )


def trainer_has_permission(
    trainer: User, program: Optional[Program] = None, course: Optional[Course] = None
) -> bool:
    if program is not None:
        return TrainerPermission.objects.filter(user=trainer, program=program).exists()

    if course is not None:
        return TrainerPermission.objects.filter(user=trainer, course=course).exists()

    return False


def grant_trainer_permission(
    trainer: User, program: Optional[Program] = None, course: Optional[Course] = None
) -> QuerySet[TrainerPermission] | Exception:

    if program is not None:
        if trainer_has_permission(trainer, program):
            raise ValueError("Trainer already has permission in program.")
        return TrainerPermission.objects.create(user=trainer, program=program)

    if course is not None:
        if trainer_has_permission(trainer, course):
            raise ValueError("Trainer already has permission in course.")
        return TrainerPermission.objects.create(user=trainer, course=course)

    raise ValueError("Program or course not provided.")


def _generate_trainer_username(first_name: str, last_name: str):
    return first_name[:3].lower() + last_name[:3].lower() + str(datetime.now().year)


def _generate_trainer_password(first_name: str, last_name: str):
    return first_name[:3].lower() + last_name[:3].lower() + str(datetime.now().year)


def register_trainer(
    first_name: str, last_name: str, email: str, date_of_birth: datetime
) -> QuerySet:
    return User.objects.create_user(
        username=_generate_trainer_username(first_name, last_name),
        email=email,
        first_name=first_name,
        last_name=last_name,
        date_of_birth=date_of_birth,
        password=_generate_trainer_password(first_name, last_name),
        is_trainer=True,
        is_password_autoset=True,
    )
