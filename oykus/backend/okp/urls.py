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


def redirect_assets(request, path):
    query_string = request.META.get("QUERY_STRING", "")
    redirect_url = "http://localhost:5173/assets/"
    if query_string:
        redirect_url += f"?{query_string}"
    return HttpResponseRedirect(redirect_url)


urlpatterns = [
    path("i18n/", include("django.conf.urls.i18n")),
    # api
    path("api/", include("okp.api.urls")),
    re_path(r"^assets/(?P<path>.*)$", redirect_assets),
] + i18n_patterns(
    path("admin/", admin.site.urls),
    # app
    path("g/", include("okp.contrib.game.urls")),
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
