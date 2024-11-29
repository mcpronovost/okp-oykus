from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from .views import PingView

# API documentation patterns
api_doc_patterns = [
    path(
        "schema/",
        SpectacularAPIView.as_view(),
        name="schema"
    ),
    path(
        "schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path(
        "",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),
]

urlpatterns = [
    path("ping/", PingView.as_view(), name="ping"),
    path("v1/", include("okp.api.v1.urls")),
    *api_doc_patterns,
]