from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from okp.users.models import OkpUser


@admin.register(OkpUser)
class OkpUserAdmin(admin.ModelAdmin):
    list_display = ("username", "playername", "is_active")
    list_filter = (
        ("is_active", admin.BooleanFieldListFilter),
    )
    search_fields = ("username", "playername")
    readonly_fields = ("created_at", "updated_at", "last_login")
    fieldsets = (
        (
            _("Auth"),
            {
                "fields": ("username", "email",),
            },
        ),
        (
            _("Identity"),
            {
                "fields": ("playername", ("abbr")),
            },
        ),
        (
            _("Visual"),
            {
                "fields": ("avatar", "cover"),
            },
        ),
        (
            _("Status"),
            {
                "fields": ("is_active", "is_staff", "is_superuser"),
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    ("can_create_game", "max_games"),
                    ("can_create_character", "max_characters"),
                ),
            },
        ),
        (
            _("Important Dates"),
            {
                "fields": ("created_at", "updated_at", "last_login"),
                "classes": ("collapse",),
            },
        ),
    )
