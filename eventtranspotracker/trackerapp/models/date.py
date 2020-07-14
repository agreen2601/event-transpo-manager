from django.db import models
from django.urls import reverse


class Date(models.Model):

    date = models.DateField()

    class Meta:
        verbose_name = ("date")
        verbose_name_plural = ("dates")

    def __str__(self):
        return f'{self.date}'

    def get_absolute_url(self):
        return reverse("date_detail", kwargs={"pk": self.pk})
