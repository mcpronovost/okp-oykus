from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView

from okp.api.paginations import (
    okpPagination
)
from okp.api.permissions import (
    okpPermissionReadOnly,
    # okpPermissionAuthenticated
)
from okp.api.community.serializers import (
    okpUserSerializer
)

User = get_user_model()


class okpCommunityUsersListView(ListAPIView):
    permission_classes = [okpPermissionReadOnly]
    queryset = User.objects.filter(
        is_active=True,
        profile__isnull=False
    ).order_by(
        "-last_login", "-date_joined"
    )
    serializer_class = okpUserSerializer
    pagination_class = okpPagination
    page_size = 12
