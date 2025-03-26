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
    page_description = None
    page_description_field = None
    page_size = 24
    theme = None
    theme_field = None

    def get_context_data(self, **kwargs):
        # Add view and request to the serializer context
        serializer_context = kwargs.copy()
        serializer_context["view"] = self
        serializer_context["request"] = self.request

        # Add the serialized data to the context
        context = super().get_context_data(**kwargs)

        if self.model:
            # Get the object dynamically using the model and specified key
            obj = get_object_or_404(self.model, **{self.key: kwargs[self.key]})

            # Serialize the object data using the given serializer
            serializer = self.serializer_class(obj, context=serializer_context)
            serialized_data = serializer.data

            # Get SEO data
            context["page_title"] = self.get_page_title(serialized_data)
            context["page_description"] = self.get_page_description(serialized_data)

            # Get theme
            context["theme"] = self.get_theme(serialized_data)

            # Add the serialized data to the context
            context["initial_data"] = json.dumps(serialized_data)

        return context

    def get_page_title(self, obj):
        if self.page_title:
            return self.page_title
        elif self.page_title_field:
            return self.get_field_value(obj, self.page_title_field)
        return None

    def get_page_description(self, obj):
        if self.page_description:
            return self.page_description
        elif self.page_description_field:
            return self.get_field_value(obj, self.page_description_field)
        return None

    def get_theme(self, obj):
        if "theme" in obj:
            return json.dumps(obj.pop("theme"))
        if self.theme:
            return json.dumps(self.theme)
        if self.theme_field:
            return json.dumps(self.get_field_value(obj, self.theme_field))
        return None

    def get_field_value(self, obj, field):
        if "." in field:
            parts = field.split(".")
            value = obj
            for part in parts:
                if value is None or not isinstance(value, dict) or part not in value:
                    value = None
                    break
                value = value[part]
            return value
        else:
            return obj.get(field)

    def paginate_data(self, data, page_size=None, page=1):
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


class OkpView(OkpPageView):
    pass
