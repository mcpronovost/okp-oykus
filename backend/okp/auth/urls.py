from django.urls import include, path
from django.utils.translation import gettext_lazy as _

urlpatterns = (
    [
        path("/", include("knox.urls")),
    ]
)
