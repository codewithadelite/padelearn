from django.urls import path, include
from rest_framework import routers
from .views import ProgramAPIView, StudentsAPIView


router = routers.DefaultRouter()
router.register(r"", ProgramAPIView)
urlpatterns = [
    path("", include(router.urls)),
    path(
        "<int:id>/students/",
        StudentsAPIView.as_view(),
        name="student-register-in-program",
    ),
]
