from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class okpAuthConfig(AppConfig):
    name = "okp.auth"
    label = "okpauth"
    verbose_name = _("Auth")
