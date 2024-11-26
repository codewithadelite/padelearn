from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema

from padelearn.account.serializers import UserSerializer
from padelearn.core.permissions import IsAdminOrReadOnly, IsAdmin
from padelearn.account.utils import get_user_by_id


from .models import Program
from .utils import (
    get_program_by_id,
    register_student_in_program,
    get_students_in_program,
)
from .exceptions import StudentRegisteredInProgramException
from .permissions import IsResponsibleTrainerOrRegisteredStudentReadOnly
from .serializers import ProgramSerializer, StudentRegisterInProgramSerializer


class ProgramAPIView(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [IsAdminOrReadOnly]
    http_method_names = ["get", "post", "put", "delete"]


class StudentsAPIView(APIView):
    """
    Endpoints for students in program
    """

    permission_classes = [IsAdmin | IsResponsibleTrainerOrRegisteredStudentReadOnly]
    serializer_class = StudentRegisterInProgramSerializer

    @swagger_auto_schema(
        responses={201: UserSerializer(many=True)},
    )
    def get(self, request, id: int, format=None, *args, **kwargs):
        """
        Get all students that are in rograms
        """
        try:
            program = get_program_by_id(id)
            students = get_students_in_program(program)
            serializer = UserSerializer(students, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {"detail": "There was error try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @swagger_auto_schema(
        request_body=serializer_class,
        responses={201: "Student registered successfully."},
    )
    def post(self, request, id: int, format=None, *args, **kwargs):
        """
        Register student in program.
        """
        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data.", "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user_id = serializer.validated_data.get("user")
        program_id = id

        try:
            register_student_in_program(
                get_user_by_id(user_id), get_program_by_id(program_id)
            )
            return Response(
                {"detail": "Student registered in program successfully."},
                status=status.HTTP_201_CREATED,
            )
        except StudentRegisteredInProgramException:
            return Response(
                {"detail": "Student already registered."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": "There was error try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
