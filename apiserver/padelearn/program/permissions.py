from rest_framework.permissions import BasePermission, SAFE_METHODS

from padelearn.account.models import TrainerPermission
from padelearn.program.utils import get_program_by_id

from .utils import student_registered_in_program


class IsResponsibleTrainerOrRegisteredStudentReadOnly(BasePermission):
    """
    Allow access to trainers whose permission to access program and
    registered students in the program.
    """

    def has_permission(self, request, view):
        if request.method not in SAFE_METHODS:
            return False

        program = get_program_by_id(view.kwargs["id"])
        is_user_authenticated = request.user.is_authenticated
        is_responsible_trainer = (
            request.user.is_trainer
            and TrainerPermission.objects.filter(
                program=program, user=request.user
            ).exists()
        )
        is_student_registered_in_program = (
            request.user.is_student
            and student_registered_in_program(request.user, program)
        )
        return bool(
            is_user_authenticated
            and (is_responsible_trainer or is_student_registered_in_program)
        )
