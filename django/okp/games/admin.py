from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from okp.games.models import (
    okpGame,
    okpGameTheme
)


@admin.register(okpGame)
class okpGameAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "founder", "owner", "updated_at"]
    readonly_fields = ["created_at", "updated_at"]
    search_fields = ["name"]


@admin.register(okpGameTheme)
class okpGameThemeAdmin(admin.ModelAdmin):
    list_display = ["__str__", "game", "updated_at"]
    readonly_fields = ["created_at", "updated_at"]
    search_fields = ["game"]
