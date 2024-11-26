from rest_framework import serializers
from .models import Course, Material


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class MaterialSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = Material
        fields = ("id", "name", "document", "generate_quiz", "course")
