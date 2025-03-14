from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from unfold.admin import ModelAdmin
from unfold.decorators import display
from .models import OkpGame, OkpGameCharacter


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
        (None, {
            "fields": (
                "title",
                "slug",
                "is_slug_auto",
                "abbr",
                "is_abbr_auto",
            )
        }),
        (_("Ownership"), {
            "fields": (
                "founder",
                "founder_link",
                "owner",
            )
        }),
        (_("Important Dates"), {
            "fields": (
                "founded_at",
                "created_at",
                "updated_at",
            )
        }),
    )


@admin.register(OkpGameCharacter)
class OkpGameCharacterAdmin(ModelAdmin):
    list_display = ("show_character", "show_is_active")
    list_filter = ("created_at", "updated_at")
    search_fields = ("name", "slug")
    readonly_fields = ("created_at", "updated_at")

    @display(description=_("Character"), header=True)
    def show_character(self, obj):
        return obj.name, obj.user.name if obj.user else None

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
        (None, {
            "fields": (
                "game",
                "user",
            )
        }),
        (_("Identity"), {
            "fields": (
                "name",
                "slug",
                "is_slug_auto",
                "abbr",
                "is_abbr_auto",
            )
        }),
        (_("Flags"), {
            "fields": (
                "is_active",
            ),
        }),
        (_("Important Dates"), {
            "fields": (
                "created_at",
                "updated_at",
            ),
        }),
    )
