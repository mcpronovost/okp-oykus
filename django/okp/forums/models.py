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
    description = models.TextField(
        verbose_name=_("Description"),
        blank=True,
        null=True
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

    @property
    def path(self):
        g = f"/g/{self.game.slug}"
        c = f"/c{self.pk}-{self.slug}"
        return f"{g}{c}"

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
    description = models.TextField(
        verbose_name=_("Description"),
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

    @property
    def path(self):
        g = f"/g/{self.game.slug}"
        c = f"/c{self.category.pk}-{self.category.slug}"
        s = f"/s{self.pk}-{self.slug}"
        return f"{g}{c}{s}"

    def save(self, *args, **kwargs):
        self.slug = f"{slugify(self.name)[:120]}"
        return super().save(*args, **kwargs)


class okpForumTopic(models.Model):
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
        related_name="topics",
        verbose_name=_("Game"),
        blank=True,
        null=True
    )
    category = models.ForeignKey(
        okpForumCategory,
        on_delete=models.SET_NULL,
        related_name="topics",
        verbose_name=_("Category"),
        blank=True,
        null=True
    )
    section = models.ForeignKey(
        okpForumSection,
        on_delete=models.SET_NULL,
        related_name="topics",
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
    topic = models.ForeignKey(
        okpForumTopic,
        on_delete=models.SET_NULL,
        related_name="messages",
        verbose_name=_("topics"),
        blank=True,
        null=True
    )
    content = models.TextField(
        verbose_name=_("Content"),
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
