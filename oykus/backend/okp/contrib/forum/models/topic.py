from django.contrib.auth import get_user_model
from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _

from okp.core.utils import get_slug
from okp.contrib.game.models import OkpGame, OkpGameCharacter

from .forum import OkpForum
from .category import OkpForumCategory
from .section import OkpForumSection


User = get_user_model()


class OkpForumTopicManager(models.Manager):
    pass


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
        blank=True,
        null=False,
    )
    is_slug_auto = models.BooleanField(
        verbose_name=_("Auto-Generate Slug"),
        default=True,
    )
    # Author
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="topics",
        verbose_name=_("User"),
        blank=True,
        null=True,
    )
    character = models.ForeignKey(
        OkpGameCharacter,
        on_delete=models.SET_NULL,
        related_name="topics",
        verbose_name=_("Character"),
        blank=True,
        null=True,
    )
    # Flags
    is_visible = models.BooleanField(
        verbose_name=_("Is Visible"),
        default=True,
        help_text=_("Whether the topic is visible to users."),
    )
    is_pinned = models.BooleanField(
        verbose_name=_("Is Pinned"),
        default=False,
        help_text=_("Whether the topic is pinned and will be displayed at the top of the section."),
    )
    is_important = models.BooleanField(
        verbose_name=_("Is Important"),
        default=False,
        help_text=_("Whether the topic is important and will be highlighted."),
    )
    is_locked = models.BooleanField(
        verbose_name=_("Is Locked"),
        default=False,
        help_text=_("Whether the topic is locked and cannot be replied to."),
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
        ordering = ["-last_post__updated_at", "-last_post__created_at", "-created_at"]

    @cached_property
    def truncated_title(self):
        if len(self.title) <= 32:
            return self.title
        return f"{self.title[:32]}..."

    def __str__(self):
        return self.truncated_title

    @cached_property
    def url(self):
        g = f"u/{self.game.slug}"
        c = f"/c{self.category.id}-{self.category.slug}" if self.category else ""
        s = f"/s{self.section.id}-{self.section.slug}" if self.section else ""
        t = f"/t{self.id}-{self.slug}"
        return f"{g}{c}{s}{t}/"

    @cached_property
    def breadcrumb(self):
        breadcrumb = []
        if self.forum:
            breadcrumb.append({"name": self.forum.title, "url": self.forum.url})
        if self.category:
            breadcrumb.append({"name": self.category.title, "url": self.category.url})
        if self.section:
            breadcrumb.append({"name": self.section.title, "url": self.section.url})
        return breadcrumb

    def save(self, *args, **kwargs):
        # Set related fields
        if self.section:
            self.category = self.section.category
            self.forum = self.section.category.forum
            self.game = self.section.category.game

        # Set slug
        if self.is_slug_auto:
            self.slug = get_slug(self.title, self, OkpForumSection, scope=["game"])

        super().save(*args, **kwargs)
