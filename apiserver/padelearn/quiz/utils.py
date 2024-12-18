from .models import Quiz
from typing import List

from padelearn.account.models import User


def get_quizes_for_user(user: User) -> List[Quiz]:
    return Quiz.objects.filter(user=user).order_by("-created_at")
