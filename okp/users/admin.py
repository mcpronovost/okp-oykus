from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _

from knox.admin import AuthTokenAdmin
from knox.models import AuthToken

User = get_user_model()


class okpUserAdmin(UserAdmin):
    list_display = [
        "username",
        "date_joined", "last_login",
        "is_active", "is_superuser"
    ]
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


class okpAuthTokenAdmin(AuthTokenAdmin):
    list_display = ["digest", "user", "created", "expiry"]
    list_filter = ["expiry"]


admin.site.unregister(User)
admin.site.register(User, okpUserAdmin)
admin.site.unregister(Group)
admin.site.unregister(AuthToken)
admin.site.register(AuthToken, okpAuthTokenAdmin)
