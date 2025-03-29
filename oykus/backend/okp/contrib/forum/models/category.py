from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _

from okp.core.models import OkpOrderableMixin
from okp.core.utils import get_slug
from okp.contrib.game.models import OkpGame

from .forum import OkpForum


class OkpForumCategoryManager(models.Manager):
    def index(self):
        return self.select_related(
            "last_post",
            "last_post__topic",
            "last_post__character",
            "last_post__user",
        )


class OkpForumCategory(OkpOrderableMixin, models.Model):
    game = models.ForeignKey(
        OkpGame,
        on_delete=models.CASCADE,
        related_name="categories",
        verbose_name=_("Game"),
        blank=False,
        null=False,
    )
    forum = models.ForeignKey(
        OkpForum,
        on_delete=models.CASCADE,
        related_name="categories",
        verbose_name=_("Forum"),
        blank=False,
        null=False,
    )
    # Identity
    title = models.CharField(
        verbose_name=_("Title"),
        max_length=255,
        blank=False,
        null=False,
    )
    slug = models.SlugField(
        verbose_name=_("Slug"),
        max_length=255,
        blank=True,
        null=False,
    )
    is_slug_auto = models.BooleanField(
        verbose_name=_("Auto-Generate Slug"),
        default=True,
    )
    # Flags
    is_visible = models.BooleanField(
        verbose_name=_("Is Visible"),
        default=True,
        help_text=_("Whether the category is visible to users."),
    )
    # Statistics
    total_posts = models.IntegerField(
        verbose_name=_("Total Posts"),
        default=0,
    )
    total_topics = models.IntegerField(
        verbose_name=_("Total Topics"),
        default=0,
    )
    last_post = models.ForeignKey(
        "okp_forum.OkpForumPost",
        verbose_name=_("Last Post"),
        on_delete=models.SET_NULL,
        related_name="last_post_category",
        blank=True,
        null=True,
    )
    # Important Dates
    created_at = models.DateTimeField(
        verbose_name=_("Created At"),
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated At"),
        auto_now=True,
    )
    order_scope = ["forum"]

    objects = OkpForumCategoryManager()

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")
        ordering = [
            "forum",
            models.F("order").asc(nulls_last=True),
            "title",
            "-created_at",
        ]
        constraints = [
            models.UniqueConstraint(
                fields=["forum", "slug"],
                name="unique_category_slug_per_forum",
            ),
        ]

    @cached_property
    def truncated_title(self):
        if len(self.title) <= 32:
            return self.title
        return f"{self.title[:32]}..."

    def __str__(self):
        f = f"{self.forum.title} - " if self.forum else ""
        c = self.truncated_title
        return f"{f}{c}"

    @cached_property
    def url(self):
        g = f"u/{self.game.slug}"
        c = f"/c{self.id}-{self.slug}"
        return f"{g}{c}/"

    @cached_property
    def breadcrumb(self):
        breadcrumb = []
        if self.forum:
            breadcrumb.append({"name": self.forum.title, "url": self.forum.url})
        return breadcrumb

    def save(self, *args, **kwargs):
        if self.is_slug_auto:
            self.slug = get_slug(self.title, self, OkpForumCategory, scope=["forum"])
        super().save(*args, **kwargs)
