from django.conf import settings
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from okp.games.models import (
    okpGame,
    okpGameCharacter
)


class okpForum(models.Model):
    game = models.OneToOneField(
        okpGame,
        on_delete=models.CASCADE,
        related_name="forum",
        verbose_name=_("Game"),
        blank=False,
        null=False
    )
    is_active = models.BooleanField(
        verbose_name=_("Active"),
        default=False
    )

    class Meta:
        verbose_name = _("Forum")
        verbose_name_plural = _("Forums")

    def __str__(self):
        return f"{self.game.name}"


class okpForumCategory(models.Model):
    forum = models.ForeignKey(
        okpForum,
        on_delete=models.CASCADE,
        related_name="categories",
        verbose_name=_("Forum"),
        blank=False,
        null=False
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=120,
        blank=False,
        null=False
    )
    description = models.CharField(
        verbose_name=_("Description"),
        max_length=255,
        blank=True,
        null=True
    )
    order_by = models.PositiveSmallIntegerField(
        verbose_name=_("Ordering"),
        blank=True,
        null=True
    )
    is_visible = models.BooleanField(
        verbose_name=_("Visible"),
        default=False
    )
    list_topics = models.JSONField(
        verbose_name=_("List of Topics"),
        default=list,
        blank=True,
        null=False
    )
    total_topics = models.PositiveSmallIntegerField(
        verbose_name=_("Total Topics"),
        default=0
    )
    total_messages = models.PositiveIntegerField(
        verbose_name=_("Total Messages"),
        default=0
    )

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")
        ordering = ["forum", "order_by", "pk"]

    def __str__(self):
        return f"{self.name}"

    @property
    def path(self):
        g = f"{self.forum.game.slug}"
        c = f"{self.pk}-{slugify(self.name)}"
        return f"{g}/{c}"

    @property
    def breadcrumbs(self):
        crumbs = []
        # =-
        g = f"/g/{self.forum.game.slug}"
        crumbs.append({
            "name": self.forum.game.name,
            "href": g
        })
        # =-
        return crumbs


class okpForumSection(models.Model):
    forum = models.ForeignKey(
        okpForum,
        on_delete=models.CASCADE,
        related_name="sections",
        verbose_name=_("Forum"),
        blank=False,
        null=False
    )
    category = models.ForeignKey(
        okpForumCategory,
        on_delete=models.SET_NULL,
        related_name="sections",
        verbose_name=_("Category"),
        blank=True,
        null=True
    )
    section = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        related_name="sections",
        verbose_name=_("Section"),
        blank=True,
        null=True
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=120,
        blank=False,
        null=False
    )
    description = models.CharField(
        verbose_name=_("Description"),
        max_length=255,
        blank=True,
        null=True
    )
    cover = models.ImageField(
        verbose_name=_("Cover"),
        upload_to="forums/sections/covers/",
        blank=True,
        null=True
    )
    order_by = models.PositiveSmallIntegerField(
        verbose_name=_("Ordering"),
        blank=True,
        null=True
    )
    is_visible = models.BooleanField(
        verbose_name=_("Visible"),
        default=False
    )
    list_topics = models.JSONField(
        verbose_name=_("List of Topics"),
        default=list,
        blank=True,
        null=False
    )

    class Meta:
        verbose_name = _("Section")
        verbose_name_plural = _("Sections")
        ordering = ["forum", "category", "order_by", "pk"]

    def __str__(self):
        return f"{self.name}"

    @property
    def total_topics(self):
        total = self.topics.count()
        # =-
        sections = self.sections.filter(is_visible=True)
        while len(sections) > 0:
            for section in sections:
                total += section.topics.count()
            sections = section.sections.filter(is_visible=True)
        # =-
        return total

    @property
    def total_messages(self):
        total = self.messages.count()
        # =-
        sections = self.sections.filter(is_visible=True)
        while len(sections) > 0:
            for section in sections:
                total += section.messages.count()
            sections = section.sections.filter(is_visible=True)
        # =-
        return total + self.total_topics

    @property
    def path(self):
        g = f"{self.forum.game.slug}"
        c = f"{self.category.pk}-{slugify(self.category.name)}"
        s = f"{self.pk}-{slugify(self.name)}"
        return f"{g}/{c}/{s}"

    @property
    def breadcrumbs(self):
        crumbs = []
        # =-
        g = f"/g/{self.forum.game.slug}"
        crumbs.append({
            "name": self.forum.game.name,
            "href": g
        })
        # =-
        c = f"{self.category.pk}-{slugify(self.category.name)}"
        crumbs.append({
            "name": self.category.name,
            "href": f"{g}/{c}"
        })
        # =-
        sections = []
        section = self.section
        while section is not None:
            s = f"{section.pk}-{slugify(section.name)}"
            sections.append({
                "name": section.name,
                "href": f"{g}/{c}/{s}"
            })
            section = section.section
        # =-
        sections.reverse()
        crumbs += sections
        return crumbs

    def all_messages(self):
        query = self.messages.all()
        # =-
        sections = self.sections.filter(is_visible=True)
        while len(sections) > 0:
            for section in sections:
                query |= section.messages.all()
            sections = section.sections.filter(is_visible=True)
        # =-
        return query

    def last_message(self):
        last = self.messages.last()
        # =-
        sections = self.sections.filter(is_visible=True)
        while len(sections) > 0:
            for section in sections:
                sec_last = section.messages.last()
                if (
                    (
                        sec_last is not None
                        and last is not None
                        and sec_last.created_at > last.created_at
                    ) or (
                        last is None
                    )
                ):
                    last = sec_last
            sections = section.sections.filter(is_visible=True)
        # =-
        return last

    def all_topics(self):
        query = self.topics.all()
        # =-
        sections = self.sections.filter(is_visible=True)
        while len(sections) > 0:
            for section in sections:
                query |= section.topics.all()
            sections = section.sections.filter(is_visible=True)
        # =-
        return query

    def last_topic(self):
        last = self.topics.first()
        # =-
        sections = self.sections.filter(is_visible=True)
        while len(sections) > 0:
            for section in sections:
                sec_last = section.topics.first()
                if (
                    (
                        sec_last is not None
                        and last is not None
                        and sec_last.created_at > last.created_at
                    ) or (
                        last is None
                    )
                ):
                    last = sec_last
            sections = section.sections.filter(is_visible=True)
        # =-
        return last

    @property
    def last_post(self):
        last_topic = self.last_topic()
        last_message = self.last_message()
        if last_topic is None and last_message is None:
            return None
        last = last_topic if (
            last_message is None
            or last_message.created_at < last_topic.created_at
        ) else last_message
        return {
            "title": last.title or last.topic.title,
            "author": last.author,
            "created_at": last.created_at
        }


class okpForumTopic(models.Model):
    forum = models.ForeignKey(
        okpForum,
        on_delete=models.CASCADE,
        related_name="topics",
        verbose_name=_("Forum"),
        blank=False,
        null=False
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
    author = models.ForeignKey(
        okpGameCharacter,
        on_delete=models.SET_NULL,
        related_name="topics",
        verbose_name=_("Author"),
        blank=True,
        null=True
    )
    title = models.CharField(
        verbose_name=_("Title"),
        max_length=120,
        blank=False,
        null=False
    )
    content = models.TextField(
        verbose_name=_("Content"),
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created At"),
        auto_now_add=True,
        blank=False,
        null=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated At"),
        auto_now=True,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Topic")
        verbose_name_plural = _("Topics")
        ordering = ["-updated_at", "-created_at"]

    def __str__(self):
        return f"{self.title}"

    @property
    def total_messages(self):
        return self.messages.count()

    @property
    def path(self):
        g = f"{self.forum.game.slug}"
        c = f"{self.category.pk}-{slugify(self.category.name)}"
        s = f"{self.section.pk}-{slugify(self.section.name)}"
        t = f"{self.pk}-{slugify(self.title)}"
        return f"{g}/{c}/{s}/{t}"

    @property
    def breadcrumbs(self):
        crumbs = []
        # =-
        g = f"/g/{self.forum.game.slug}"
        crumbs.append({
            "name": self.forum.game.name,
            "href": g
        })
        # =-
        c = f"{self.category.pk}-{slugify(self.category.name)}"
        crumbs.append({
            "name": self.category.name,
            "href": f"{g}/{c}"
        })
        # =-
        sections = []
        section = self.section
        while section is not None:
            s = f"{section.pk}-{slugify(section.name)}"
            sections.append({
                "name": section.name,
                "href": f"{g}/{c}/{s}"
            })
            section = section.section
        # =-
        sections.reverse()
        crumbs += sections
        return crumbs


class okpForumMessage(models.Model):
    forum = models.ForeignKey(
        okpForum,
        on_delete=models.CASCADE,
        related_name="messages",
        verbose_name=_("Forum"),
        blank=False,
        null=False
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
        on_delete=models.CASCADE,
        related_name="messages",
        verbose_name=_("Topic"),
        blank=False,
        null=False
    )
    author = models.ForeignKey(
        okpGameCharacter,
        on_delete=models.SET_NULL,
        related_name="messages",
        verbose_name=_("Author"),
        blank=True,
        null=True
    )
    content = models.TextField(
        verbose_name=_("Content"),
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created At"),
        auto_now_add=True,
        blank=False,
        null=False
    )
    updated_at = models.DateTimeField(
        verbose_name=_("Updated At"),
        auto_now=True,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Message")
        verbose_name_plural = _("Messages")
        ordering = ["created_at"]

    def __str__(self):
        return f"#{self.pk}"
