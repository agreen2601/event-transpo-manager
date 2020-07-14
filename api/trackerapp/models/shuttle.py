from django.db import models
from django.urls import reverse


class Shuttle(models.Model):

    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = ("shuttle")
        verbose_name_plural = ("shuttles")

    def __str__(self):
        return f'{self.name}'

    def get_absolute_url(self):
        return reverse("shuttle_detail", kwargs={"pk": self.pk})

