from rest_framework import serializers
from .models import Quiz


class QuizSerializer(serializers.ModelSerializer):
    result = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = ["id", "title", "score", "total", "result"]

    def get_result(self, obj):
        if obj.total == 0:
            return "success"
        return "success" if obj.score >= (obj.total / 2) else "failed"
