from django.urls import path, include
from rest_framework import routers
from .views import CourseAPIView, CourseMaterialsAPIView, CourseMaterialDocumentAPIView


router = routers.DefaultRouter()
router.register("", CourseAPIView)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "<int:id>/materials/", CourseMaterialsAPIView.as_view(), name="course-materials"
    ),
    path("materials/<int:id>/document", CourseMaterialDocumentAPIView.as_view(), name="material-document")

]