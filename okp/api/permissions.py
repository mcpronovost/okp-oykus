from rest_framework.permissions import (
    SAFE_METHODS,
    BasePermission
)


class okpPermissionAny(BasePermission):
    """
    Allows access to everyone.
    """

    def has_permission(self, request, view):
        return bool(True)


class okpPermissionReadOnly(BasePermission):
    """
    Allows access to everyone, but read-only.
    """

    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS
        )


class okpPermissionAuthenticated(BasePermission):
    """
    Allows access to authenticated users.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)
