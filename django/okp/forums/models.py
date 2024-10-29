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
            "game",
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
        g = f"/g/{self.game.slug}"
        c = f"/c{self.category.pk}-{self.category.slug}"
        s = f"/s{self.section.pk}-{self.section.slug}"
        t = f"/t{self.pk}-{self.slug}"
        return f"{g}{c}{s}{t}"

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

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Update the last message on the topic
        if self.topic:
            self.topic.last_message = self
            self.topic.total_messages = self.topic.messages.count()
            self.topic.save(
                update_fields=["last_message", "total_messages"]
            )

        # Update the last topic and last message on the section
        if self.section:
            print("section : ", self.section.total_messages)
            self.section.last_topic = self.topic
            self.section.last_message = self
            self.section.total_messages = self.section.topics.aggregate(
                models.Sum("total_messages")
            )["total_messages__sum"] or 0
            self.section.save(
                update_fields=["last_topic", "last_message", "total_messages"]
            )
