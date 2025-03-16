from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from unfold.admin import ModelAdmin
from unfold.decorators import display

from okp.contrib.forum.models import OkpForumCategory

ACTIVES_STATUS = {
    _("Active"): "success",
    _("Inactive"): "danger",
}

VISIBLE_STATUS = {
    _("Visible"): "success",
    _("Hidden"): "danger",
}

@admin.register(OkpForumCategory)
class OkpForumCategoryAdmin(ModelAdmin):
    list_display = ("show_category", "forum", "total_posts", "total_topics", "show_is_visible", "show_order")
    list_filter = ("created_at", "updated_at")
    search_fields = ("title", "slug")
    readonly_fields = ("created_at", "updated_at")

    @display(description=_("Category"), header=True)
    def show_category(self, obj):
        return obj.title, obj.slug

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
        (None, {
            "fields": (
                "game",
                "forum",
                "title",
                "slug",
                "is_slug_auto",
            )
        }),
        (_("Flags"), {
            "fields": (
                "is_visible",
                "order",
            ),
        }),
        (_("Important Dates"), {
            "fields": ("created_at", "updated_at")
        }),
    )
