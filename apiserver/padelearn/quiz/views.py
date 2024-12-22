from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from padelearn.quiz.models import Quiz, QuizAnswer
from padelearn.question.models import Question, QuestionAnswer
from padelearn.core.permissions import IsStudent, IsStudentRegisteredInCourse


from .serializers import QuizSerializer
from .utils import get_quizes_for_user


class QuizAPIView(APIView):
    permission_classes = [IsStudent]
    serializer_class = QuizSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieve quizzes for the logged-in user.
        """
        try:
            quizzes = get_quizes_for_user(request.user)
            serializer = self.serializer_class(quizzes, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"detail": "An error occurred. Please try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class QuizAnswersAPIView(APIView):
    """
    Endpoint to submit answers for a quiz and calculate the score.
    """

    permission_classes = []

    def post(self, request, id: int, *args, **kwargs):
        try:
            # Get quiz ID and answers from the request
            quiz_id = request.data.get("quiz")
            quiz_answers = request.data.get("quiz_answers")

            if not quiz_id:
                return Response(
                    {"detail": "Quiz ID required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Ensure the quiz exists
            quiz = get_object_or_404(Quiz, id=quiz_id)

            if not quiz:
                return Response(
                    {"detail": "Quiz not found."},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Get the correct answers for each question in the quiz
            total_questions = len(quiz_answers)
            correct_answers = 0

            user = request.user  # Assuming the user is authenticated

            # List to store the QuizAnswer objects to save later
            quiz_answer_objects = []

            for answer_data in quiz_answers:
                question_id = answer_data.get("question")
                answer_id = answer_data.get("answer")

                # Ensure the question and answer exist
                question = Question.objects.filter(id=question_id).first()
                answer = (
                    QuestionAnswer.objects.filter(id=answer_id).first()
                    if answer_id != 0
                    else None
                )

                if not question:
                    return Response(
                        {"detail": f"Invalid question ID: {question_id}"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                # Create the QuizAnswer object
                quiz_answer = QuizAnswer(
                    user=user, quiz=quiz, question=question, answer=answer
                )

                # Check if the answer is correct
                if isinstance(answer, QuestionAnswer) and answer.is_correct_answer:
                    correct_answers += 1

                quiz_answer_objects.append(quiz_answer)

            # Bulk create QuizAnswer objects
            QuizAnswer.objects.bulk_create(quiz_answer_objects)

            # Save scores

            quiz.score = correct_answers
            quiz.total = total_questions
            quiz.save()

            # Calculate the score and result
            score = f"{correct_answers}/{total_questions}"
            result = "success" if correct_answers >= total_questions / 2 else "fail"

            return Response(
                {
                    "score": score,
                    "result": result,
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            print(e)
            return Response(
                {"detail": "An error occurred. Please try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class QuizReviewAPIView(APIView):
    """
    Endpoint to retrieve quiz questions, answers, and the student's responses.
    """

    permission_classes = [IsStudent]

    def get(self, request, id: int, *args, **kwargs):
        try:
            # Fetch the quiz by ID
            quiz = get_object_or_404(Quiz, id=id, user=request.user)

            # Get all questions related to the quiz
            questions = Question.objects.filter(
                id__in=QuizAnswer.objects.filter(quiz=quiz).values_list(
                    "question__id", flat=True
                )
            )

            # Prepare the response data
            response_data = []

            for question in questions:
                # Get all possible answers for the question
                possible_answers = QuestionAnswer.objects.filter(question=question)

                # Get the student's response for this question
                student_answer = QuizAnswer.objects.filter(
                    quiz=quiz, question=question, user=request.user
                ).first()

                response_data.append(
                    {
                        "question": {
                            "id": question.id,
                            "text": question.question,
                        },
                        "answers": [
                            {
                                "id": answer.id,
                                "text": answer.answer,
                                "is_correct": answer.is_correct_answer,
                                "is_the_answer": (
                                    student_answer.answer.id == answer.id
                                    if student_answer and student_answer.answer
                                    else False
                                ),
                            }
                            for answer in possible_answers
                        ],
                    }
                )

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response(
                {"detail": "An error occurred. Please try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
