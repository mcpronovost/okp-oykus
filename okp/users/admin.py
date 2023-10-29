from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class okpUserAdmin(UserAdmin):
    list_display = ["username", "is_active"]
    list_filter = ["is_active"]
    readonly_fields = ["date_joined", "last_login"]
    fieldsets = (
        (_("Personal Information"), {
            "fields": [
                "username",
                "email",
                "password",
                "date_joined",
                "last_login"
            ]
        }),
        (_("Permissions"), {
            "fields": [
                "is_active",
                "is_staff",
                "is_superuser"
            ]
        })
    )


admin.site.unregister(User)
admin.site.register(User, okpUserAdmin)
admin.site.unregister(Group)
