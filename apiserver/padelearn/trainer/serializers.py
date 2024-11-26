from rest_framework import serializers
from padelearn.account.models import TrainerPermission
from padelearn.program.serializers import ProgramSerializer
from padelearn.course.serializers import CourseSerializer


class TrainerRegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    date_of_birth = serializers.DateField()


class TrainerPermissionSerializer(serializers.ModelSerializer):
    program = ProgramSerializer(read_only=True)
    course = CourseSerializer(read_only=True)

    class Meta:
        model = TrainerPermission
        fields = ["id", "program", "course"]


class TrainerGrantPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainerPermission
        fields = ["program", "course"]

    def validate(self, attrs):
        if attrs.get("program") is None and attrs.get("course") is None:
            raise serializers.ValidationError("Program or course id is required.")

        if attrs.get("program") is not None and attrs.get("course") is not None:
            raise serializers.ValidationError(
                "Program and course id must not be passed at the same time."
            )

        return attrs
