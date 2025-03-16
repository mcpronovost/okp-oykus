from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from unfold.admin import ModelAdmin
from unfold.decorators import display

from okp.contrib.forum.models import OkpForumSection

ACTIVES_STATUS = {
    _("Active"): "success",
    _("Inactive"): "danger",
}

VISIBLE_STATUS = {
    _("Visible"): "success",
    _("Hidden"): "danger",
}


@admin.register(OkpForumSection)
class OkpForumSectionAdmin(ModelAdmin):
    list_display = (
        "show_section",
        "forum",
        "total_posts",
        "total_topics",
        "show_is_visible",
        "show_order",
    )
    list_filter = ("created_at", "updated_at")
    search_fields = ("title", "slug")
    readonly_fields = ("created_at", "updated_at")

    @display(description=_("Section"), header=True)
    def show_section(self, obj):
        return (obj.truncated_title, obj.category.title if obj.category else "")

    @display(
        description=_("Visible"),
        ordering="is_visible",
        label=VISIBLE_STATUS,
    )
    def show_is_visible(self, obj):
        return _("Visible") if obj.is_visible else _("Hidden")

    @display(description=_("Order"), ordering="order", label=True)
    def show_order(self, obj):
        return obj.order

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "game",
                    "forum",
                    "category",
                    "title",
                    "slug",
                    "is_slug_auto",
                )
            },
        ),
        (
            _("Appearance"),
            {
                "fields": ("flex",),
            },
        ),
        (
            _("Flags"),
            {
                "fields": (
                    "is_visible",
                    "order",
                ),
            },
        ),
        (
            _("Statistics"),
            {
                "fields": ("total_posts", "total_topics"),
            },
        ),
        (_("Important Dates"), {"fields": ("created_at", "updated_at")}),
    )
