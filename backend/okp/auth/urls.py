from django.urls import include, path
from django.utils.translation import gettext_lazy as _

from okp.auth.views import (
    okpUserView
)

urlpatterns = (
    [
        path("/", include("knox.urls")),
        path("me/", okpUserView.as_view()),
    ]
)
