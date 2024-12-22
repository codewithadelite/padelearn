from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _


from .models import User, TrainerPermission


class UserAdminExtended(UserAdmin):
    list_display = ("username", "email", "first_name", "last_name", "is_admin", "is_student",
                    "is_trainer")
    list_filter = ("is_admin", "is_student", "is_trainer", "groups")
    search_fields = ("username", "first_name", "last_name", "email")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "username")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_admin",
                    "is_student",
                    "is_trainer",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login",)}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "usable_password", "password1", "password2"),
            },
        ),
    )


admin.site.register(User, UserAdminExtended)
admin.site.register(TrainerPermission)
