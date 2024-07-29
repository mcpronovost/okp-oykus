from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.utils.translation import gettext_lazy as _

from okp.users.views import (
    okpPingView
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("silk/", include("silk.urls", namespace="silk")),
    path("api/ping/", okpPingView.as_view()),
    path("api/auth/", include("okp.users.urls")),
    path("api/forum/", include("okp.forums.urls", namespace="okp.forums")),
] + i18n_patterns(
    # re_path(r"^", include("example.urls"))
) + static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
) + static(
    settings.STATIC_URL, document_root=settings.STATIC_ROOT
)


admin.site.site_header = _("Oykus Admin Panel")
admin.site.site_title = _("Oykus Admin Panel")
admin.site.index_title = _("Administration")
