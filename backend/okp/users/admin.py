from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _

from okp.users.models import okpUserProfile

User = get_user_model()


class okpUserProfileInline(admin.StackedInline):
    model = okpUserProfile


class okpUserAdmin(UserAdmin):
    list_display = ["username", "profile_name", "is_active"]
    list_filter = ["is_active"]
    readonly_fields = ["date_joined", "last_login"]
    fieldsets = (
        (_("Authentication Informations"), {
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
    inlines = [okpUserProfileInline]

    @admin.display(description=_("Name"))
    def profile_name(self, obj):
        return obj.profile.name if obj.profile is not None else "-"


admin.site.unregister(User)
admin.site.register(User, okpUserAdmin)
admin.site.unregister(Group)
