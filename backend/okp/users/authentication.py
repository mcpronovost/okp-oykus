import base64
from django.utils.translation import gettext_lazy as _
from rest_framework import HTTP_HEADER_ENCODING
from rest_framework.authentication import (
    BaseAuthentication,
    get_authorization_header
)
from rest_framework.exceptions import AuthenticationFailed
from okp.users.models import okpRat


def get_agent_header(request):
    auth = request.META.get("HTTP_AGENT", b"")
    if isinstance(auth, str):
        auth = auth.encode(HTTP_HEADER_ENCODING)
    return auth


class RatAuthentication(BaseAuthentication):
    keyword = "Rat"
    model = okpRat

    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        authagent = get_agent_header(request).split()

        if not auth or auth[0].lower() != self.keyword.lower().encode():
            return None

        if (
            not authagent
            or authagent[0].lower() != self.keyword.lower().encode()
        ):
            return None

        if len(auth) == 1:
            msg = _("No rat provided.")
            raise AuthenticationFailed(msg)
        elif len(authagent) == 1:
            msg = _("No agent provided.")
            raise AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = _("Rat should not contain spaces.")
            raise AuthenticationFailed(msg)
        elif len(authagent) > 2:
            msg = _("Agent should not contain spaces.")
            raise AuthenticationFailed(msg)

        try:
            rat = auth[1].decode()
            agent = authagent[1].decode()
        except UnicodeError:
            msg = _("Rat or Agent should't contain invalid characters.")
            raise AuthenticationFailed(msg)

        if rat is None or agent is None:
            msg = _("No credentials provided.")
            raise AuthenticationFailed(msg)

        return self.authenticate_credentials(
            rat,
            base64.b64decode(agent).decode("UTF-8")
        )

    def authenticate_credentials(self, rat, agent):
        try:
            token = self.model.objects.select_related("user").get(
                rat=rat,
                agent=agent
            )
        except self.model.DoesNotExist:
            raise AuthenticationFailed(_("Invalid Rat and/or Agent."))

        if not token.user.is_active:
            raise AuthenticationFailed(_("User inactive or deleted."))

        return (token.user, token)

    def authenticate_header(self, request):
        return self.keyword
