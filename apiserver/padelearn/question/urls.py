from django.urls import path
from .views import QuestionAPIView

urlpatterns = [path("courses/<int:id>", QuestionAPIView.as_view(), name="questions")]
