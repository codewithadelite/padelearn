from django.urls import path

from .views import TrainersAPIView, TrainersDetailsAPIView, TrainerPermissionsAPIView

urlpatterns = [
    path("", TrainersAPIView.as_view(), name="trainers"),
    path("<int:id>/", TrainersDetailsAPIView.as_view(), name="trainers-details"),
    path(
        "<int:id>/permissions/",
        TrainerPermissionsAPIView.as_view(),
        name="trainers-permissions",
    ),
]
