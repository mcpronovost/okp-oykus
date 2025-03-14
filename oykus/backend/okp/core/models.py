from django.db import models, transaction


class OkpOrderableMixin(models.Model):
    order = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if self.pk:
            # Updating an existing instance
            old_order = self.__class__.objects.get(pk=self.pk).order
            if old_order != self.order:
                self.shift_orders(old_order, self.order)

        super().save(*args, **kwargs)

    def shift_orders(self, old_order, new_order):
        """Shifts the order of related objects to avoid conflicts."""
        with transaction.atomic():
            if old_order < new_order:
                # Moving down
                self.__class__.objects.filter(
                    order__gt=old_order, order__lte=new_order
                ).update(order=models.F("order") - 1)
            else:
                # Moving up
                self.__class__.objects.filter(
                    order__gte=new_order, order__lt=old_order
                ).update(order=models.F("order") + 1)
