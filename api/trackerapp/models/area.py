from django.db import models
from django.urls import reverse

class Area(models.Model):

    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = ("area")
        verbose_name_plural = ("areas")

    def __str__(self):
        return f'{self.name}'

    def get_absolute_url(self):
        return reverse("driver_detail", kwargs={"pk": self.pk})

