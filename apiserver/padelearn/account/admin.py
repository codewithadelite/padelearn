from django.contrib import admin
from .models import User, TrainerPermission


admin.site.register(User)
admin.site.register(TrainerPermission)
