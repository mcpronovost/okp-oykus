from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from okp.games.models import OkpGame


@admin.register(OkpGame)
class OkpGameAdmin(admin.ModelAdmin):
    list_display = ("name", "owner", "total_players", "total_characters", "is_active", "is_public")
    list_filter = (
        ("owner", admin.RelatedOnlyFieldListFilter),
        ("is_active", admin.BooleanFieldListFilter),
        ("is_public", admin.BooleanFieldListFilter),
    )
    search_fields = ("name",)
    readonly_fields = ("total_players", "total_characters", "created_at", "updated_at")

    def get_fieldsets(self, request, obj=None):
        # Return all fieldsets when editing (obj is not None)
        if obj:
            return (
                (
                    _("Identity"),
                    {
                        "fields": ("name", ("abbr", "is_abbr_auto"), ("slug", "is_slug_auto")),
                    },
                ),
                (
                    _("Ownership"),
                    {
                        "fields": ("owner", "founder"),
                    },
                ),
                (
                    _("Status"),
                    {
                        "fields": ("is_active", "is_public"),
                    },
                ),
                (
                    _("Counts"),
                    {
                        "fields": ("total_players", "total_characters"),
                        "classes": ("collapse",),
                    },
                ),
                (
                    _("Important Dates"),
                    {
                        "fields": ("created_at", "updated_at"),
                        "classes": ("collapse",),
                    },
                ),
            )

        # Return only basic fieldset when creating new object
        return (
            (
                None,
                {
                    "fields": ("name", "owner", "founder"),
                },
            ),
        )
