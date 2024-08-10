from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from okp.games.models import (
    okpGame,
    okpGameCharacter
)


@admin.register(okpGame)
class okpGameAdmin(admin.ModelAdmin):
    list_display = ["name", "owner", "is_active"]
    list_filter = ["is_active"]
    prepopulated_fields = {"slug": ["name"]}
    readonly_fields = ["created_at", "updated_at"]
    fieldsets = (
        (_("General"), {
            "fields": [
                "name",
                "slug",
                "founder",
                "owner",
                "is_active",
                "created_at",
                "updated_at"
            ]
        }),
    )


@admin.register(okpGameCharacter)
class okpGameCharacterAdmin(admin.ModelAdmin):
    list_display = ["name", "game", "is_active"]
    list_filter = ["is_active", "is_valid", "game"]
    readonly_fields = ["created_at", "updated_at"]
    fieldsets = (
        (_("General"), {
            "fields": [
                "user",
                "game",
                "name",
                "avatar",
                "is_active",
                "is_valid",
                "created_at",
                "updated_at"
            ]
        }),
    )
