"""
URL configuration for okp project.
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from okp.settings import STATIC_URL, STATIC_ROOT, MEDIA_URL, MEDIA_ROOT
from okp.views import AppView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("okp.api.urls")),
    path("<path:uri>/", AppView.as_view(), name="app"),
    path("", AppView.as_view(), name="app"),
] + static(
    STATIC_URL, document_root=STATIC_ROOT
) + static(
    MEDIA_URL, document_root=MEDIA_ROOT
)
