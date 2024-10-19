from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class okpForumsConfig(AppConfig):
    name = "okp.forums"
    label = "okpforums"
    verbose_name = _("Forums")
