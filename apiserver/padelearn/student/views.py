from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from padelearn.core.permissions import IsAdmin
from padelearn.account.serializers import UserSerializer

from drf_yasg.utils import swagger_auto_schema

from .serializers import StudentRegisterSerializer
from .utils import register_student


class StudentAPIView(APIView):
    """
    Register student
    """

    permission_classes = [IsAdmin]
    serializer_class = StudentRegisterSerializer

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
            user = register_student(
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
