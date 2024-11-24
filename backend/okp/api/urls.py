from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from okp.api.v1.views import PingView

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
    path("v1/ping/", PingView.as_view(), name="ping"),
    path("v1/users/", include("okp.api.v1.users.urls")),
    *api_doc_patterns,
]