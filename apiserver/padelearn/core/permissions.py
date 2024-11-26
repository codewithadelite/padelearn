from django.db.models import Q, F, Subquery
from rest_framework.permissions import BasePermission, SAFE_METHODS

from padelearn.account.models import TrainerPermission
from padelearn.course.utils import get_course_by_id
from padelearn.student.models import StudentRegistered


class IsAdminOrReadOnly(BasePermission):
    """
    Allow full access to Admin user or read only to Trainers and Students.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return bool(
                request.user.is_authenticated
                and (
                    request.user.is_admin
                    or request.user.is_trainer
                    or request.user.is_student
                )
            )

        return bool(request.user.is_authenticated and request.user.is_admin)


class IsAdmin(BasePermission):
    """
    Allow access to admin users only.
    """

    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.is_admin)


class IsResponsibleTrainer(BasePermission):
    """
    Allow access to trainers whose permission to manage course or program in which the course belongs to.
    """

    def has_permission(self, request, view):
        course_id = view.kwargs.get("id")
        course = get_course_by_id(course_id)
        is_user_authenticated = request.user.is_authenticated
        return bool(
            is_user_authenticated
            and request.user.is_trainer
            and TrainerPermission.objects.filter(
                Q(user=request.user), Q(course=course) | Q(program=course.program)
            ).exists()
        )


class IsStudentRegisteredInCourse(BasePermission):
    """
    Allow access to students who are registered in program which the course belongs to.
    """

    def has_permission(self, request, view):
        if request.method not in SAFE_METHODS:
            return False

        course_id = view.kwargs.get("id")
        course = get_course_by_id(course_id)
        is_user_authenticated = request.user.is_authenticated
        return bool(
            is_user_authenticated
            and request.user.is_student
            and StudentRegistered.objects.filter(
                user=request.user, program=course.program
            ).exists()
        )
