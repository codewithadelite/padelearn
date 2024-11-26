from django.core.validators import validate_email
from django.core.exceptions import ValidationError

# Thirdparty imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from rest_framework_simplejwt.tokens import RefreshToken

from drf_yasg.utils import swagger_auto_schema

from .models import User
from .serializers import (
    UserSerializer,
    UserSignInSerializer,
    UserSignInResponseSerializer,
    UserSignOutSerializer,
)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return (
        str(refresh.access_token),
        str(refresh),
    )


class SignInApiView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSignInSerializer

    @swagger_auto_schema(
        request_body=serializer_class,
        responses={201: UserSignInResponseSerializer()},
    )
    def post(self, request, format=None, *args, **kwargs):
        try:
            email = request.data.get("email", False)
            password = request.data.get("password", False)

            # Raise Exception when email or password not provided
            if not email or not password:
                return Response(
                    {"detail": "Email or password required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            email = email.strip().lower()

            try:
                validate_email(email)
            except ValidationError as e:
                return Response(
                    {"detail": "Please provide a valid email adress."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = User.objects.filter(email=email).first()

            if user is None:
                # The user does not exist
                return Response(
                    {"detail": "No user with provided credentials"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            correct_password = user.check_password(password)

            if not correct_password:
                # The password is incorrect
                return Response(
                    {"detail": "Invalid credentials"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if not user.is_active:
                return Response(
                    {
                        "detail": "You account has been deactivated. Contuct us to activate it again"
                    },
                    status=status.HTTP_403_FORBIDDEN,
                )

            access_token, refresh_token = get_tokens_for_user(user)
            user_data = UserSerializer(user).data

            return Response(
                {
                    "access": access_token,
                    "refresh": refresh_token,
                    "user": user_data,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"detail": "There was error signing in."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class SignOutApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSignOutSerializer

    @swagger_auto_schema(
        request_body=UserSignOutSerializer, responses={200: "Signed out."}
    )
    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data)

            if not serializer.is_valid():
                return Response(
                    {"detail": "Invalid data."}, status=status.HTTP_400_BAD_REQUEST
                )

            refresh_token = serializer.validated_data.get("refresh_token", False)
            token = RefreshToken(refresh_token)
            token.blacklist()  # TODO : Remove access token before it expire.
            return Response({"detail": "Signed out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"detail": "There was error try again." + str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
