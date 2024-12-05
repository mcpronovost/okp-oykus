from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.utils.translation import gettext_lazy as _

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("okp.api.urls")),
] + i18n_patterns()

# Add static and media files serving
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Admin site customization
admin.site.site_header = _("Oykus Admin Panel")
admin.site.site_title = _("Oykus Admin Panel")
admin.site.index_title = _("Administration")
