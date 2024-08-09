from django.conf import settings
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from okp.games.models import okpGame


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
        max_length=32,
        blank=False,
        null=False
    )
    description = models.CharField(
        verbose_name=_("Description"),
        max_length=255,
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
        max_length=32,
        blank=False,
        null=False
    )
    description = models.CharField(
        verbose_name=_("Description"),
        max_length=255,
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
        verbose_name = _("Section")
        verbose_name_plural = _("Sections")

    def __str__(self):
        return f"{self.name}"

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
        settings.AUTH_USER_MODEL,
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
    total_messages = models.PositiveIntegerField(
        verbose_name=_("Total Messages"),
        default=0
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

    def __str__(self):
        return f"{self.title}"

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
        settings.AUTH_USER_MODEL,
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

    def __str__(self):
        return f"#{self.pk}"
