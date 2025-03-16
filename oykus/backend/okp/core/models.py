from django.db import models, transaction


class OkpOrderableMixin(models.Model):
    """
    Abstract model for orderable objects through a scope.
    """
    order = models.PositiveIntegerField(default=1, blank=False, null=False)
    order_scope = []

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if self.pk:
            old_order = self.__class__.objects.get(pk=self.pk).order
            if old_order != self.order:
                self.shift_orders(old_order, self.order)
        else:
            filters = {}
            for field in self.order_scope:
                filters[field] = getattr(self, field)
            last_order = self.__class__.objects.filter(**filters).last()
            self.order = last_order.order + 1 if last_order else 1

        super().save(*args, **kwargs)

    def shift_orders(self, old_order, new_order):
        """Shifts the order of related objects to avoid conflicts."""
        with transaction.atomic():
            filters = {}
            for field in self.order_scope:
                filters[field] = getattr(self, field)

            if old_order < new_order:
                # Moving down
                self.__class__.objects.filter(
                    **filters,
                    order__gt=old_order,
                    order__lte=new_order
                ).update(order=models.F("order") - 1)
            else:
                # Moving up
                self.__class__.objects.filter(
                    **filters,
                    order__gte=new_order,
                    order__lt=old_order
                ).update(order=models.F("order") + 1)
