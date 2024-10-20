from django.db import models
from django.db.models import F
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from okp.games.models import okpGame


class okpForumCategory(models.Model):
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=120,
        blank=False,
        null=False
    )
    slug = models.SlugField(
        verbose_name=_("Slug"),
        max_length=120,
        blank=True,
        null=True
    )
    game = models.ForeignKey(
        okpGame,
        on_delete=models.CASCADE,
        related_name="categories",
        verbose_name=_("Game"),
        blank=False,
        null=False
    )
    sortby = models.PositiveSmallIntegerField(
        verbose_name=_("Sort"),
        default=None,
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created"),
        auto_now_add=True,
        blank=False,
        null=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated"),
        auto_now=True,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")
        ordering = [
            F("sortby").asc(nulls_last=True),
            "created_at"
        ]

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        self.slug = f"{slugify(self.name)[:120]}"
        return super().save(*args, **kwargs)


class okpForumSection(models.Model):
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=120,
        blank=False,
        null=False
    )
    slug = models.SlugField(
        verbose_name=_("Slug"),
        max_length=120,
        blank=True,
        null=True
    )
    game = models.ForeignKey(
        okpGame,
        on_delete=models.CASCADE,
        related_name="sections",
        verbose_name=_("Game"),
        blank=False,
        null=False
    )
    category = models.ForeignKey(
        okpForumCategory,
        on_delete=models.CASCADE,
        related_name="sections",
        verbose_name=_("Category"),
        blank=False,
        null=False
    )
    sortby = models.PositiveSmallIntegerField(
        verbose_name=_("Sort"),
        default=None,
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created"),
        auto_now_add=True,
        blank=False,
        null=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated"),
        auto_now=True,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Section")
        verbose_name_plural = _("Sections")
        ordering = [
            F("sortby").asc(nulls_last=True),
            "created_at"
        ]

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        self.slug = f"{slugify(self.name)[:120]}"
        return super().save(*args, **kwargs)


class okpForumChapter(models.Model):
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=120,
        blank=False,
        null=False
    )
    slug = models.SlugField(
        verbose_name=_("Slug"),
        max_length=120,
        blank=True,
        null=True
    )
    game = models.ForeignKey(
        okpGame,
        on_delete=models.SET_NULL,
        related_name="chapters",
        verbose_name=_("Game"),
        blank=True,
        null=True
    )
    category = models.ForeignKey(
        okpForumCategory,
        on_delete=models.SET_NULL,
        related_name="chapters",
        verbose_name=_("Category"),
        blank=True,
        null=True
    )
    section = models.ForeignKey(
        okpForumSection,
        on_delete=models.SET_NULL,
        related_name="chapters",
        verbose_name=_("Section"),
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created"),
        auto_now_add=True,
        blank=False,
        null=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated"),
        auto_now=True,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Chapter")
        verbose_name_plural = _("Chapters")
        ordering = [
            "-updated_at",
            "-created_at"
        ]

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        self.slug = f"{slugify(self.name)[:120]}"
        return super().save(*args, **kwargs)


class okpForumMessage(models.Model):
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=120,
        blank=False,
        null=False
    )
    game = models.ForeignKey(
        okpGame,
        on_delete=models.SET_NULL,
        related_name="messages",
        verbose_name=_("Game"),
        blank=True,
        null=True
    )
    category = models.ForeignKey(
        okpForumCategory,
        on_delete=models.SET_NULL,
        related_name="messages",
        verbose_name=_("Category"),
        blank=True,
        null=True
    )
    section = models.ForeignKey(
        okpForumSection,
        on_delete=models.SET_NULL,
        related_name="messages",
        verbose_name=_("Category"),
        blank=True,
        null=True
    )
    chapter = models.ForeignKey(
        okpForumChapter,
        on_delete=models.SET_NULL,
        related_name="messages",
        verbose_name=_("chapter"),
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created"),
        auto_now_add=True,
        blank=False,
        null=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated"),
        auto_now=True,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Message")
        verbose_name_plural = _("Messages")
        ordering = [
            "created_at"
        ]

    def __str__(self):
        return f"Message #{self.pk}"
