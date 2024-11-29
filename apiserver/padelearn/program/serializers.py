from rest_framework import serializers
from .models import Program
from datetime import datetime


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = "__all__"

    def to_internal_value(self, data):
        # Convert incoming date strings to `yyyy-MM-dd` format if necessary
        if "start_date" in data and data["start_date"]:
            data["start_date"] = self.parse_date(data["start_date"])
        if "end_date" in data and data["end_date"]:
            data["end_date"] = self.parse_date(data["end_date"])

        return super().to_internal_value(data)

    def parse_date(self, date_str):
        # Define your expected date formats here
        formats = ["%Y-%m-%d", "%Y-%m-%dT%H:%M:%S.%fZ", "%Y-%m-%dT%H:%M:%SZ"]
        for fmt in formats:
            try:
                return datetime.strptime(date_str, fmt).date()
            except ValueError:
                continue
        raise serializers.ValidationError("Date format is not supported.")


class StudentRegisterInProgramSerializer(serializers.Serializer):
    user = serializers.IntegerField()
