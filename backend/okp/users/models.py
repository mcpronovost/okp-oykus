import os
import binascii
from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class okpUserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
        verbose_name=_("Profile"),
        blank=False,
        null=False
    )
    name = models.CharField(
        verbose_name=_("Name"),
        max_length=32,
        blank=False,
        null=False
    )
    avatar = models.ImageField(
        verbose_name=_("Avatar"),
        upload_to="avatars/",
        blank=True,
        null=True
    )
    list_unread_topics = models.JSONField(
        verbose_name=_("List of Unread Topics"),
        default=list,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")

    def __str__(self):
        return f"{_('Profile')}"

    @property
    def total_messages(self):
        result = 0
        for character in self.user.characters.filter(is_active=True):
            result += character.topics.count()
            result += character.messages.count()
        return result

    @property
    def total_topics(self):
        result = 0
        for character in self.user.characters.filter(is_active=True):
            result += character.topics.count()
        return result

    @property
    def total_achievements(self):
        return 0


class okpRat(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="rats",
        verbose_name=_("User"),
        blank=False,
        null=False
    )
    rat = models.CharField(
        verbose_name=_("Rat"),
        max_length=40,
        unique=True,
        blank=False,
        null=False
    )
    agent = models.CharField(
        verbose_name=_("Agent"),
        max_length=250,
        blank=False,
        null=False
    )
    expired_at = models.DateTimeField(
        verbose_name=_("Expired At"),
        blank=False,
        null=False
    )
    created_at = models.DateTimeField(
        verbose_name=_("Created At"),
        auto_now_add=True,
        blank=False,
        null=False
    )

    class Meta:
        verbose_name = _("Rat")
        verbose_name_plural = _("Rats")

    def __str__(self):
        return self.rat

    def save(self, *args, **kwargs):
        if not self.rat:
            self.rat = self.generate_rat()
            self.expired_at = timezone.now() + timezone.timedelta(days=30)
        return super().save(*args, **kwargs)

    @classmethod
    def generate_rat(cls):
        return binascii.hexlify(os.urandom(20)).decode()

    @property
    def browser(self):
        if self.agent is None:
            return "-"
        if "Brave/" in self.agent:
            return "Brave"
        if "Firefox/" in self.agent and "Seamonkey/" not in self.agent:
            return "Firefox"
        if "Seamonkey/" in self.agent:
            return "Seamonkey"
        if "Opera/" in self.agent or "OPR/" in self.agent:
            return "Opera"
        if (
            "Safari/" in self.agent
            and ("Chrome/" not in self.agent and "Chromium/" not in self.agent)
        ):
            return "Safari"
        if "Chromium/" in self.agent:
            return "Chromium"
        if (
            "Chrome/" in self.agent
            and "Edg." not in self.agent
        ):
            return "Chrome"
        return f"({self.agent.split(" ")[1]})"
    browser.fget.short_description = _("Browser")
