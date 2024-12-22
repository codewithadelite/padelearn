from django.urls import path
from .views import QuizAnswersAPIView, QuizAPIView, QuizReviewAPIView


urlpatterns = [
    path("", QuizAPIView.as_view()),
    path("<int:id>/submit", QuizAnswersAPIView.as_view()),
    path("<int:id>/review", QuizReviewAPIView.as_view()),
]
