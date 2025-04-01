from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _, pgettext_lazy

from unfold.admin import ModelAdmin
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm

from .models import OkpUser, OkpAuthToken


@admin.register(OkpUser)
class OkpUserAdmin(UserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    list_display = ("name", "email", "is_active")
    list_filter = ("is_active",)
    filter_horizontal = ("groups", "user_permissions")
    search_fields = ("username", "name", "email")
    readonly_fields = ("created_at", "updated_at", "last_login")

    fieldsets = (
        (None, {
            "fields": ("username", "email", "password")
        }),
        (_("Identity"), {
            "fields": (
                "first_name",
                "middle_name",
                "last_name",
                "name", "is_name_auto",
                "abbr", "is_abbr_auto",
                "slug", "is_slug_auto",
            )
        }),
        (_("Media"), {
            "fields": (
                "avatar",
                "cover",
            )
        }),
        (
            pgettext_lazy("admin_is_boolean", "Status"),
            {
                "fields": (
                    "is_active",
                ),
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "max_owned_games",
                    # "groups",
                    # "user_permissions",
                ),
                "classes": ("collapse",),
            },
        ),
        (
            _("Statistics"),
            {
                "fields": ("total_topics", "total_posts", "last_post"),
            },
        ),
        (_("Important dates"), {
            "fields": (
                "created_at",
                "updated_at",
                "last_login",
            )
        }),
    )


@admin.register(OkpAuthToken)
class OkpAuthTokenAdmin(ModelAdmin):
    list_display = ("user", "token_key", "created", "expiry")
    list_filter = ("expiry",)
    search_fields = ("user__name", "user__username", "user__email")
    readonly_fields = (
        "user",
        "token_key",
        "created",
        "expiry",
        "data_agent",
        "data_platform",
        "data_mobile"
    )

    fieldsets = (
        (None, {
            "fields": (
                "user",
                "token_key",
                "created",
                "expiry",
            )
        }),
        (_("Data"), {
            "fields": (
                "data_agent",
                "data_platform",
                "data_mobile",
            )
        }),
    )

    def data_agent(self, obj):
        return obj.data.get("AGENT", "-")
    data_agent.short_description = _("Browser Agent")

    def data_platform(self, obj):
        return obj.data.get("PLATFORM", "-")
    data_platform.short_description = _("Browser Platform")

    def data_mobile(self, obj):
        return obj.data.get("MOBILE", "-")
    data_mobile.short_description = _("Browser Mobile")

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False


admin.site.unregister(Group)
