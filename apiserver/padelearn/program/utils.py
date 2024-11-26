from typing import List

from django.shortcuts import get_object_or_404
from django.db.models import QuerySet

from padelearn.account.models import User
from padelearn.student.models import StudentRegistered

from .models import Program
from .exceptions import StudentRegisteredInProgramException


def get_program_by_id(program_id: int) -> Program:
    return get_object_or_404(Program, pk=program_id)


def student_registered_in_program(user: User, program: Program):
    return StudentRegistered.objects.filter(user=user, program=program).exists()


def register_student_in_program(user: User, program: Program) -> QuerySet | Exception:
    if student_registered_in_program(user, program):
        raise StudentRegisteredInProgramException(
            "Student already registered in program."
        )

    return StudentRegistered.objects.create(user=user, program=program)


def get_students_in_program(program: Program) -> List[User]:
    students_ids = StudentRegistered.objects.filter(program=program).values_list(
        "user__id"
    )
    return User.objects.filter(id__in=students_ids)
