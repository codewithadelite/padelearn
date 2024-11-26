from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static


schema_view = get_schema_view(
    openapi.Info(
        title="Padelearn API",
        default_version="v1",
        description="Open-source Moodle alternative, focused on AI-powered assessments that help students improve \
        their understanding of materials through personalized feedback.",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/accounts/", include("padelearn.account.urls")),
    path("api/v1/courses/", include("padelearn.course.urls")),
    path("api/v1/programs/", include("padelearn.program.urls")),
    path("api/v1/questions/", include("padelearn.question.urls")),
    path("api/v1/quizes/", include("padelearn.quiz.urls")),
    path("api/v1/trainers/", include("padelearn.trainer.urls")),
    path("api/v1/students/", include("padelearn.student.urls")),
]

# Urls for OpenAPI documentation

urlpatterns += [
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]


urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
