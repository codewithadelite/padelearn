from django.contrib import admin
from .models import Question, QuestionAnswer


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("id", "question", "course", "created_at")
    list_display_links = ("id", "question")
    list_editable = ()
    list_per_page = 25
    search_fields = ("question", "course__name", "material__name")
    ordering = ("-created_at",)


@admin.register(QuestionAnswer)
class QuestionAnswerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "answer",
        "is_correct_answer",
        "question",
        "created_at",
        "updated_at",
    )
    list_display_links = ("id", "answer")
    list_editable = ("is_correct_answer",)
    list_per_page = 25
    search_fields = ("answer", "question__question")
    ordering = ("-created_at",)
