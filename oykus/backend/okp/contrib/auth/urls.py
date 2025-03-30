from django.urls import re_path
from django.utils.translation import gettext_lazy as _

from .views import (
    OkpAuthGamesView,
)

urlpatterns = [
    re_path(_(r"^games/$"), OkpAuthGamesView.as_view(), name="okp_auth_games"),
]
