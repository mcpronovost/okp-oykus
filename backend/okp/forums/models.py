from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import F
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from okp.fields import okpImageField, okpImageSizeValidator
from okp.games.models import okpGame, okpCharacter

CHOIX_SECTION_BASIS = (
    ("auto", _("Default")),
    ("25", _("25% (1/4)")),
    ("33", _("33% (1/3)")),
    ("50", _("50% (2/4)")),
    ("66", _("66% (2/3)")),
    ("75", _("75% (3/4)")),
    ("100", _("100% (4/4)"))
)


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
            "game",
            F("sortby").asc(nulls_last=True),
            "created_at"
        ]

    def __str__(self):
        return f"{self.name}"

    @property
    def path(self):
        d = f"{settings.DOMAIN}"
        g = f"/g/{self.game.slug}"
        c = f"/c{self.pk}-{self.slug}"
        return f"{d}{g}{c}"

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
    banner = okpImageField(
        verbose_name=_("Banner"),
        upload_to="forums/sections/banners",
        max_width=1000,
        max_height=200,
        blank=True,
        null=True,
        validators=[okpImageSizeValidator],
    )
    banner_height = models.PositiveSmallIntegerField(
        verbose_name=_("Banner Height"),
        default=100,
        blank=False,
        null=False
    )
    basis = models.CharField(
        verbose_name=_("Basis"),
        max_length=4,
        choices=CHOIX_SECTION_BASIS,
        default="auto",
        blank=False,
        null=False
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
    last_topic = models.OneToOneField(
        "okpForumTopic",
        on_delete=models.SET_NULL,
        related_name="last_topic_section",
        verbose_name=_("Last Topic"),
        blank=True,
        null=True
    )
    last_message = models.OneToOneField(
        "okpForumMessage",
        on_delete=models.SET_NULL,
        related_name="last_message_section",
        verbose_name=_("Last Message"),
        blank=True,
        null=True
    )
    total_topics = models.PositiveSmallIntegerField(
        verbose_name=_("Total Topics"),
        default=0,
        blank=False,
        null=False
    )
    total_messages = models.PositiveSmallIntegerField(
        verbose_name=_("Total Messages"),
        default=0,
        blank=False,
        null=False
    )
    show_last_message = models.BooleanField(
        verbose_name=_("Show Last Message"),
        default=True,
        blank=False,
        null=False
    )
    show_last_topic = models.BooleanField(
        verbose_name=_("Show Last Topic"),
        default=True,
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
            "game",
            "category",
            F("sortby").asc(nulls_last=True),
            "created_at"
        ]

    def __str__(self):
        return f"{self.name}"

    @property
    def path(self):
        d = f"{settings.DOMAIN}"
        g = f"/g/{self.game.slug}"
        c = f"/c{self.category.pk}-{self.category.slug}"
        s = f"/s{self.pk}-{self.slug}"
        return f"{d}{g}{c}{s}"

    def save(self, *args, **kwargs):
        self.slug = f"{slugify(self.name)[:120]}"
        return super().save(*args, **kwargs)


class okpForumTopic(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        related_name="author_topics",
        verbose_name=_("User"),
        blank=True,
        null=True
    )
    character = models.ForeignKey(
        okpCharacter,
        on_delete=models.SET_NULL,
        related_name="author_topics",
        verbose_name=_("Character"),
        blank=True,
        null=True
    )
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
    last_message = models.OneToOneField(
        "okpForumMessage",
        on_delete=models.SET_NULL,
        related_name="last_message_topic",
        verbose_name=_("Last Message"),
        blank=True,
        null=True
    )
    total_messages = models.PositiveSmallIntegerField(
        verbose_name=_("Total Messages"),
        default=0,
        blank=False,
        null=False
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
        verbose_name = _("Topic")
        verbose_name_plural = _("Topics")
        ordering = [
            "-updated_at",
            "-created_at"
        ]

    def __str__(self):
        return f"{self.name}"

    @property
    def path(self):
        d = f"{settings.DOMAIN}"
        g = f"/g/{self.game.slug}"
        c = f"/c{self.category.pk}-{self.category.slug}"
        s = f"/s{self.section.pk}-{self.section.slug}"
        t = f"/t{self.pk}-{self.slug}"
        return f"{d}{g}{c}{s}{t}"

    def save(self, *args, **kwargs):
        self.slug = f"{slugify(self.name)[:120]}"
        super().save(*args, **kwargs)

        # Update section total topics
        if self.section:
            self.section.total_topics = self.section.topics.count()
            self.section.save(
                update_fields=["total_topics"]
            )


class okpForumMessage(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.SET_NULL,
        related_name="author_messages",
        verbose_name=_("User"),
        blank=True,
        null=True
    )
    character = models.ForeignKey(
        okpCharacter,
        on_delete=models.SET_NULL,
        related_name="author_messages",
        verbose_name=_("Character"),
        blank=True,
        null=True
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
        verbose_name=_("Section"),
        blank=True,
        null=True
    )
    topic = models.ForeignKey(
        okpForumTopic,
        on_delete=models.SET_NULL,
        related_name="messages",
        verbose_name=_("Topic"),
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

    @property
    def path(self):
        d = f"{settings.DOMAIN}"
        g = f"/g/{self.game.slug}"
        c = f"/c{self.category.pk}-{self.category.slug}"
        s = f"/s{self.section.pk}-{self.section.slug}"
        t = f"/t{self.topic.pk}-{self.topic.slug}"
        return f"{d}{g}{c}{s}{t}"

    def save(self, *args, **kwargs):
        is_new = self._state.adding
        super().save(*args, **kwargs)

        # Update the last message on the topic only if this is a new message
        if is_new and self.topic:
            self.topic.last_message = self
            self.topic.total_messages = self.topic.messages.count()
            self.topic.save(
                update_fields=["last_message", "total_messages"]
            )

        # Update the last topic and last message on the section only if this is a new message
        if is_new and self.section:
            self.section.last_topic = self.topic
            self.section.last_message = self
            self.section.total_messages = self.section.topics.aggregate(
                models.Sum("total_messages")
            )["total_messages__sum"] or 0
            self.section.save(
                update_fields=["last_topic", "last_message", "total_messages"]
            )
