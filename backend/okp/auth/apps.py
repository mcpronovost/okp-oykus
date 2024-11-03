from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class okpAuthConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "okp.auth"
    label = "okp_auth"
    verbose_name = _("Auth")
