from rest_framework import serializers


class StudentRegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    date_of_birth = serializers.DateField()
