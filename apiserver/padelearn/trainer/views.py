# Thirdparty imports
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from padelearn.core.permissions import IsAdmin
from padelearn.account.serializers import UserSerializer
from padelearn.program.utils import get_program_by_id
from padelearn.course.utils import get_course_by_id


from drf_yasg.utils import swagger_auto_schema

from .serializers import (
    TrainerRegisterSerializer,
    TrainerPermissionSerializer,
    TrainerGrantPermissionSerializer,
)
from .utils import (
    register_trainer,
    get_trainer_by_id,
    get_trainers_list,
    get_trainer_permissions,
    grant_trainer_permission,
)


class TrainersAPIView(APIView):
    """
    Register trainer
    """

    permission_classes = [IsAdmin]
    serializer_class = TrainerRegisterSerializer

    @swagger_auto_schema(responses={200: UserSerializer(many=True)})
    def get(self, request, format=None, *args, **kwargs):
        try:
            trainers = get_trainers_list()
            serializer = UserSerializer(trainers, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"detail": "There was error try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @swagger_auto_schema(
        request_body=serializer_class, responses={201: UserSerializer()}
    )
    def post(self, request, format=None, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data.", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = register_trainer(
                serializer.validated_data["first_name"],
                serializer.validated_data["last_name"],
                serializer.validated_data["email"],
                serializer.validated_data["date_of_birth"],
            )

            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"detail": "There was error try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class TrainersDetailsAPIView(APIView):
    permission_classes = [IsAdmin]
    serializer_class = UserSerializer

    @swagger_auto_schema(responses={200: serializer_class()})
    def get(self, request, id: int, *args, **kwargs):
        try:
            trainer = get_trainer_by_id(id)
            serializer = self.serializer_class(trainer, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Http404:
            return Response(
                {"detail": "No trainer found for this id."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": "There was error try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @swagger_auto_schema(responses={204: "Trainer deleted successfuly."})
    def delete(self, request, id: int, *args, **kwargs):
        try:
            trainer = get_trainer_by_id(id)
            trainer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except Http404:
            return Response(
                {"detail": "No trainer found for this id."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": "There was error try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class TrainerPermissionsAPIView(APIView):
    permission_classes = [IsAdmin]
    serializer_class = TrainerPermissionSerializer

    @swagger_auto_schema(responses={200: serializer_class()})
    def get(self, request, id: int, format=None, *args, **kwargs):
        """
        Get trainer permissions.
        """
        try:
            trainer_id = int(id)
            serializer = self.serializer_class(
                get_trainer_permissions(get_trainer_by_id(trainer_id)), many=True
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Http404:
            return Response(
                {"detail": "No trainer found for this id."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": "There was error try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @swagger_auto_schema(
        request_body=TrainerGrantPermissionSerializer,
        responses={200: serializer_class()},
    )
    def post(self, request, id: int, format=None, *args, **kwargs):
        """
        Grant trainer permission to program or specific course.
        """
        try:
            serializer = TrainerGrantPermissionSerializer(data=request.data)

            if not serializer.is_valid():
                return Response(
                    {"detail": "Invalid data.", "errors": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            trainer = get_trainer_by_id(id)
            program = serializer.validated_data.get("program")
            course = serializer.validated_data.get("course")

            permission = grant_trainer_permission(trainer, program, course)
            return Response(
                TrainerPermissionSerializer(permission).data, status=status.HTTP_200_OK
            )
        except Http404:
            return Response(
                {"detail": "No trainer found for this id."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except ValueError as ve:
            return Response(
                {"detail": str(ve)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": "There was error try again." + str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
