"""
URL configuration.
"""
from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import include, path, re_path

from okp.core.views import OkpView


urlpatterns = [
    path("i18n/", include("django.conf.urls.i18n")),
    # api
    path("api/", include("okp.api.urls")),
] + i18n_patterns(
    path("admin/", admin.site.urls),
    # app
    path("a/", include("okp.contrib.auth.urls")),
    re_path(r"^g/(?P<slug>[\w-]+)/", include("okp.contrib.game.urls")),
    re_path(r"^", OkpView.as_view()),
)

urlpatterns += static(
    settings.STATIC_URL,
    document_root=settings.STATIC_ROOT
)
urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
