from typing import List
from .models import Question, QuestionAnswer

from padelearn.course.utils import get_course_by_id


def get_questions_ids_for_course(course_id: int):
    return Question.objects.filter(course=get_course_by_id(course_id)).values_list(
        "id", flat=True
    )


def get_answers_for_questions(questions_ids: List[int]):
    return QuestionAnswer.objects.select_related().filter(
        question__id__in=questions_ids
    )
