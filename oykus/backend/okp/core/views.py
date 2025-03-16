import json
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView


class OkpPageView(TemplateView):
    template_name = "app.html"
    model = None
    serializer_class = None
    key = "pk"
    page_title = None
    page_title_field = None

    def get_context_data(self, **kwargs):
        # Get the object dynamically using the model and primary key
        obj = get_object_or_404(self.model, **{self.key: kwargs[self.key]})

        # Serialize the object data using the given serializer
        serializer = self.serializer_class(obj, context=kwargs)
        serialized_data = serializer.data

        # Add the serialized data to the context
        context = super().get_context_data(**kwargs)
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
