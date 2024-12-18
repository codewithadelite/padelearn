from django.http import Http404, HttpResponse, FileResponse

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated

from padelearn.core.permissions import (
    IsAdminOrReadOnly,
    IsResponsibleTrainer,
    IsStudentRegisteredInCourse,
    IsAdmin,
)
from padelearn.program.utils import get_program_by_id

from drf_yasg.utils import swagger_auto_schema

from .models import Course
from .serializers import CourseSerializer, MaterialSerializer
from .utils import (
    get_course_by_id,
    get_course_materials,
    get_material_by_id,
)
from .tasks import generate_quiz_from_document


class CourseAPIView(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminOrReadOnly]
    http_method_names = ["get", "post", "put", "delete"]

    def get_queryset(self):
        queryset = Course.objects.all()
        program_id = self.request.query_params.get("program_id", None)
        if program_id is not None:
            queryset = queryset.filter(program=get_program_by_id(program_id))
        return queryset


class CourseMaterialsAPIView(APIView):
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsResponsibleTrainer | IsStudentRegisteredInCourse | IsAdmin]
    serializer_class = MaterialSerializer

    @swagger_auto_schema(responses={200: serializer_class(many=True)})
    def get(self, request, id: int, format=None, *args, **kwargs):
        try:
            materials = get_course_materials(get_course_by_id(id))
            serializer = self.serializer_class(materials, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Http404:
            return Response(
                {"detail": "No course found for provided id."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": "There was error, try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    @swagger_auto_schema(
        request_body=serializer_class, responses={200: serializer_class()}
    )
    def post(self, request, id: int, format=None, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data)
            if not serializer.is_valid():
                return Response(
                    {"detail": "Invalid data.", "error": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            course = get_course_by_id(id)
            material = serializer.save(course=course)

            if serializer.validated_data.get("generate_quiz"):

                # Generate multiple choice questions from document in the background

                generate_quiz_from_document.delay(
                    request.build_absolute_uri(material.document.url),
                    course_id=course.id,
                    material_id=material.id,
                    save=True,
                )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Http404:
            return Response(
                {"detail": "No course found for provided id."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": "There was error, try again." + "->" + str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CourseMaterialDetailsAPIView(APIView):
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsResponsibleTrainer]
    serializer_class = MaterialSerializer

    @swagger_auto_schema(responses={200: serializer_class(many=True)})
    def delete(self, request, id: int, material_id: int, format=None, *args, **kwargs):
        try:
            material = get_material_by_id(material_id)
            material.delete()
            return Response(
                {"detail": "Deleted successfully."}, status=status.HTTP_204_NO_CONTENT
            )
        except Http404:
            return Response(
                {"detail": "No material found for provided id."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": "There was error, try again."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class CourseMaterialDocumentAPIView(APIView):
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsAuthenticated]
    # TODO: Allow document download for only students registered in course and trainers responsible for courses
    serializer_class = MaterialSerializer

    @swagger_auto_schema(responses={200: serializer_class(many=True)})
    def get(self, request, id: int, format=None, *args, **kwargs):
        try:
            material = get_material_by_id(id)

            # Serve the file
            response = FileResponse(
                material.document.open("rb"),  # Open file in binary mode
                content_type="application/pdf",
            )
            response["Content-Disposition"] = (
                f'attachment; filename="{material.document.name}"'
            )
            return response
        except Http404:
            return Response(
                {"detail": "No material found for provided id."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"detail": "There was error, try again." + str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
