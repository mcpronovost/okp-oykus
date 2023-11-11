from rest_framework import pagination
from rest_framework.response import Response


class okpPagination(pagination.PageNumberPagination):
    page_size = 100

    def get_page_size(self, request):
        query_size = request.query_params.get("size", None)
        if query_size is not None:
            return query_size
        view = request.parser_context["view"]
        if request.user.is_authenticated:
            return getattr(request.user, view.pagination_size)
        if hasattr(view, "page_size"):
            return getattr(view, "page_size")
        return self.page_size

    def get_paginated_response(self, data):
        return Response({
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "count": self.page.paginator.count,
            "size": self.page.paginator.per_page,
            "results": data
        })