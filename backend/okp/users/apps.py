from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class okpUsersConfig(AppConfig):
    name = "okp.users"
    label = "okpusers"
    verbose_name = _("Users")
