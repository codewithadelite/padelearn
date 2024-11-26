from typing import List

from django.shortcuts import get_object_or_404

from padelearn.question.models import Question, QuestionAnswer
from padelearn.ai.question.schemas import Question as QuestionSchema

from padelearn.program.utils import get_program_by_id

from .models import Course, Material


def get_course_by_id(course_id: int) -> Course:
    return get_object_or_404(Course, pk=course_id)


def get_course_by_program_id(program_id: int) -> Course:
    return Course.objects.filter(program=get_program_by_id(program_id))


def get_material_by_id(material_id: int) -> Material:
    return get_object_or_404(Material, pk=material_id)


def get_course_materials(course: Course) -> List[Material]:
    return Material.objects.select_related("course").filter(course=course)



def save_questions_to_db(
    course: Course, material: Material, questions: List[QuestionSchema]
):
    answers_bulk = []
    for question in questions:

        # Create the Question object
        question_obj = Question.objects.create(
            question=question.get("question"), course=course, material=material
        )

        # Create the related QuestionAnswer objects
        for answer in question.get("answers"):
            # Check if this is the correct answer
            is_correct = answer == question.get("correct_answer")
            # Save the answer to the database
            answers_bulk.append(
                QuestionAnswer(
                    question=question_obj, answer=answer, is_correct_answer=is_correct
                )
            )

    QuestionAnswer.objects.bulk_create(answers_bulk)
