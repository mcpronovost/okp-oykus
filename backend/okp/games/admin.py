from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from okp.games.models import okpGame


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
