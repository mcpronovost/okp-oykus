from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _

from okp.core.utils import get_slug
from okp.contrib.game.models import OkpGame

from .forum import OkpForum
from .category import OkpForumCategory
from .section import OkpForumSection


class OkpForumTopicManager(models.Manager):
    def section(self):
        return self.select_related(
            "last_post",
            "last_post__character",
            "last_post__user",
        )


class OkpForumTopic(models.Model):
    game = models.ForeignKey(
        OkpGame,
        on_delete=models.CASCADE,
        related_name="topics",
        verbose_name=_("Game"),
        blank=False,
        null=False,
    )
    forum = models.ForeignKey(
        OkpForum,
        on_delete=models.CASCADE,
        related_name="topics",
        verbose_name=_("Forum"),
        blank=False,
        null=False,
    )
    category = models.ForeignKey(
        OkpForumCategory,
        on_delete=models.SET_NULL,
        related_name="topics",
        verbose_name=_("Category"),
        blank=True,
        null=True,
    )
    section = models.ForeignKey(
        OkpForumSection,
        on_delete=models.SET_NULL,
        related_name="topics",
        verbose_name=_("Section"),
        blank=True,
        null=True,
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
        unique=True,
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
        help_text=_("Whether the topic is visible to users."),
    )
    # Statistics
    total_posts = models.PositiveIntegerField(
        verbose_name=_("Total Posts"),
        default=0,
        help_text=_("The total number of posts in the topic."),
    )
    last_post = models.ForeignKey(
        "okp_forum.OkpForumPost",
        verbose_name=_("Last Post"),
        on_delete=models.SET_NULL,
        related_name="last_post_topic",
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

    class Meta:
        verbose_name = _("Topic")
        verbose_name_plural = _("Topics")
        ordering = ["title", "-updated_at", "-created_at"]

    def __str__(self):
        return self.title

    @cached_property
    def url(self):
        g = f"/g/{self.game.slug}"
        c = f"/c{self.category.id}-{self.category.slug}" if self.category else ""
        s = f"/s{self.section.id}-{self.section.slug}" if self.section else ""
        t = f"/t{self.id}-{self.slug}"
        return f"{g}{c}{s}{t}/"

    def save(self, *args, **kwargs):
        if self.is_slug_auto:
            self.slug = get_slug(self.title, self, OkpForumSection)
        super().save(*args, **kwargs)
