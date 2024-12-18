from django.urls import path
from .views import QuizAnswersAPIView, QuizAPIView


urlpatterns = [
    path("", QuizAPIView.as_view()),
    path("<int:id>/submit", QuizAnswersAPIView.as_view()),
]
