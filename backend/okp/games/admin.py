from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from okp.games.models import (
    okpGame,
    okpGameTheme,
    okpCharacter
)


@admin.register(okpGame)
class okpGameAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "founder", "owner", "updated_at"]
    readonly_fields = ["created_at", "updated_at"]
    search_fields = ["name"]


@admin.register(okpGameTheme)
class okpGameThemeAdmin(admin.ModelAdmin):
    list_display = ["game", "updated_at"]
    readonly_fields = ["created_at", "updated_at"]
    search_fields = ["game"]


@admin.register(okpCharacter)
class okpCharacterAdmin(admin.ModelAdmin):
    list_display = ["name", "user", "game", "updated_at"]
    list_filter = [
        ("game", admin.RelatedOnlyFieldListFilter)
    ]
    readonly_fields = ["created_at", "updated_at"]
    search_fields = ["name", "user", "game"]
