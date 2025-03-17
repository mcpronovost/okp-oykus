import json
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView


class OkpPageView(TemplateView):
    template_name = "index.html"
    model = None
    serializer_class = None
    key = "pk"
    page_title = None
    page_title_field = None
    page_size = 24

    def get_context_data(self, **kwargs):
        # Get the object dynamically using the model and primary key
        obj = get_object_or_404(self.model, **{self.key: kwargs[self.key]})

        # Add view and request to the serializer context
        serializer_context = kwargs.copy()
        serializer_context["view"] = self
        serializer_context["request"] = self.request

        # Serialize the object data using the given serializer
        serializer = self.serializer_class(obj, context=serializer_context)
        serialized_data = serializer.data

        # Add the serialized data to the context
        context = super().get_context_data(**kwargs)
        if "theme" in serialized_data:
            context["theme"] = serialized_data.pop("theme")
        context["initial_data"] = json.dumps(serialized_data)
        if self.page_title:
            context["page_title"] = self.page_title
        elif self.page_title_field:
            if "." in self.page_title_field:
                parts = self.page_title_field.split(".")
                value = serialized_data
                for part in parts:
                    if value is None or not isinstance(value, dict) or part not in value:
                        value = None
                        break
                    value = value[part]
                context["page_title"] = value
            else:
                context["page_title"] = serialized_data.get(self.page_title_field)
        return context

    def paginate_data(self, data, page_size=None, page=1):
        """
        Paginate a queryset or list of objects.

        Args:
            data: The queryset or list to paginate
            page_size: Number of items per page (defaults to self.page_size)
            page: The page number to return (defaults to 1)

        Returns:
            dict: A dictionary containing pagination metadata and results
        """

        # Use provided page_size or fall back to class default
        page_size = page_size or self.page_size
        paginator = Paginator(data, page_size)

        try:
            paginated_data = paginator.page(page)
        except PageNotAnInteger:
            paginated_data = paginator.page(1)
        except EmptyPage:
            paginated_data = paginator.page(paginator.num_pages)

        # Return paginated data with metadata
        return {
            "count": paginator.count,
            "total_pages": paginator.num_pages,
            "page": paginated_data.number,
            "next": (
                paginated_data.next_page_number() if paginated_data.has_next() else None
            ),
            "previous": (
                paginated_data.previous_page_number() if paginated_data.has_previous() else None
            ),
            "results": paginated_data.object_list,
        }
