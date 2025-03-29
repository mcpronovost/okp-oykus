from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from unfold.admin import ModelAdmin
from unfold.decorators import display

from okp.contrib.game.models import OkpGame


@admin.register(OkpGame)
class OkpGameAdmin(ModelAdmin):
    list_display = ("show_game", "created_at", "updated_at")
    search_fields = ("title", "slug")
    list_filter = ("created_at", "updated_at")
    readonly_fields = ("created_at", "updated_at")

    @display(description=_("Game"), header=True)
    def show_game(self, obj):
        return obj.title, obj.slug

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "title",
                    "slug",
                    "is_slug_auto",
                    "abbr",
                    "is_abbr_auto",
                    "subtitle",
                    "logo",
                    "cover",
                )
            },
        ),
        (
            _("Ownership"),
            {
                "fields": (
                    "founder",
                    "founder_link",
                    "owner",
                )
            },
        ),
        (
            _("Important Dates"),
            {
                "fields": (
                    "founded_at",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )
