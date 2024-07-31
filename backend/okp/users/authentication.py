from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from rest_framework import HTTP_HEADER_ENCODING
from rest_framework.authentication import (
    BaseAuthentication,
    get_authorization_header
)
from rest_framework.exceptions import AuthenticationFailed
from okp.users.models import okpRat


def get_agent_header(request):
    agent = request.META.get("HTTP_USER_AGENT", b"")
    if isinstance(agent, str):
        agent = agent.replace("Mozilla/5.0 ", "")
        if "HTTP_SEC_CH_UA" in request.META:
            if "Brave" in request.META["HTTP_SEC_CH_UA"]:
                agent = agent.replace("Chrome/", "Brave/")
            elif "Chromium" in request.META["HTTP_SEC_CH_UA"]:
                agent = agent.replace("Chrome/", "Chromium/")
        agent = agent.encode(HTTP_HEADER_ENCODING)
    return agent


class okpRatAuthentication(BaseAuthentication):
    keyword = "Rat"
    model = okpRat

    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        agent = get_agent_header(request)

        if not auth or auth[0].lower() != self.keyword.lower().encode():
            return None

        if not agent:
            return None

        if len(auth) == 1:
            msg = _("No rat provided.")
            raise AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = _("Rat should not contain spaces.")
            raise AuthenticationFailed(msg)

        try:
            rat = auth[1].decode()
            agent = agent.decode()
        except UnicodeError:
            msg = _("Rat or Agent should't contain invalid characters.")
            raise AuthenticationFailed(msg)

        if rat is None or agent is None:
            msg = _("No credentials provided.")
            raise AuthenticationFailed(msg)

        return self.authenticate_credentials(
            rat,
            agent
        )

    def authenticate_credentials(self, rat, agent):
        try:
            token = self.model.objects.select_related("user").filter(
                rat=rat,
                agent=agent
            ).first()
        except self.model.DoesNotExist:
            raise AuthenticationFailed(_("Invalid Rat and/or Agent."))

        if token is None or not token.user.is_active:
            raise AuthenticationFailed(_("User inactive or deleted."))

        if token.expired_at < timezone.now():
            token.delete()
            raise AuthenticationFailed(_("Token expired."))

        return (token.user, token)

    def authenticate_header(self, request):
        return self.keyword
