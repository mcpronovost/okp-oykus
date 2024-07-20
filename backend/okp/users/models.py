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
    list_unread_topics = models.JSONField(
        verbose_name=_("List of Unread Topics"),
        default=list
    )

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")

    def __str__(self):
        return f"{_('Profile')}"


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
