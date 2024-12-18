from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from padelearn.core.permissions import (
    IsResponsibleTrainer,
    IsStudentRegisteredInCourse,
)
from padelearn.core.utils import pick_random_numbers
from padelearn.course.models import Course
from padelearn.quiz.models import Quiz
from .utils import get_questions_ids_for_course, get_answers_for_questions

TOTAL_QUIZ_QUESTIONS = 10
QUESTIONS_LABELS = ["A", "B", "C", "D", "C"]


class QuestionAPIView(APIView):
    """
    Returns list of questions
    """

    permission_classes = [IsResponsibleTrainer | IsStudentRegisteredInCourse]

    def get(self, request, id: int, format=None, *args, **kwargs):
        try:
            questions = []

            # Get course related to the quiz
            course = Course.objects.get(id=id)
            course_name = (
                course.name
            )  # Assuming 'name' is the field for the course name

            # Generate the quiz title based on the course name
            quiz_title = f"Quiz - {course_name}"

            # Create quiz for the logged-in user
            user = request.user

            # Get ids of all course's questions
            questions_ids = list(get_questions_ids_for_course(id))

            if len(questions_ids) <= 0:
                return Response(
                    {"detail": "No questions found."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            random_questions_ids = pick_random_numbers(
                questions_ids, TOTAL_QUIZ_QUESTIONS
            )
            quiz = Quiz.objects.create(title=quiz_title, user=user, course=course)

            # Get question's answers
            questions_answers = get_answers_for_questions(random_questions_ids)

            for q_id in random_questions_ids:
                question = {"id": q_id, "question": "", "options": []}
                q_answers = [qa for qa in questions_answers if qa.question.id == q_id]

                for qa in q_answers:
                    if question["question"] == "":
                        question["question"] = qa.question.question

                    question["options"].append(
                        {
                            "id": qa.id,
                            "label": QUESTIONS_LABELS[len(question["options"])],
                            "text": qa.answer,
                        }
                    )

                questions.append(question)
            return Response(
                {"quiz": quiz.id, "questions": questions}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"detail": "Error occured try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
