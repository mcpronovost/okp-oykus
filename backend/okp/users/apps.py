from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class OkpUsersConfig(AppConfig):
    name = "okp.users"
    verbose_name = _("Users")
