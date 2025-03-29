from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from unfold.admin import ModelAdmin
from unfold.decorators import display

from okp.contrib.game.models import OkpGameTheme


@admin.register(OkpGameTheme)
class OkpGameThemeAdmin(ModelAdmin):
    list_display = ("show_theme", "show_is_active")
    list_filter = ("is_active",)
    search_fields = ("name",)
    readonly_fields = ("created_at", "updated_at")

    @display(description=_("Theme"), header=True)
    def show_theme(self, obj):
        return (obj.name, obj.game.title)

    @display(
        description=_("Active"),
        ordering="is_active",
        label={
            _("Active"): "success",
            _("Inactive"): "danger",
        },
    )
    def show_is_active(self, obj):
        return _("Active") if obj.is_active else _("Inactive")

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "game",
                    "name",
                    "is_active",
                ),
            },
        ),
        (
            _("Core"),
            {
                "fields": (
                    "primary",
                    "core_bg",
                    "core_fg",
                    "core_subtle_fg",
                    "core_link",
                    "core_border",
                    "core_header_bg",
                    "core_header_fg",
                    "core_elevated_bg",
                    "core_elevated_fg",
                ),
            },
        ),
        (
            _("Card"),
            {
                "fields": (
                    "card_bg",
                    "card_placeholder_bg",
                    "card_placeholder_fg",
                    "card_separator",
                ),
            },
        ),
    )
