from django.db import models
from django.urls import reverse
from .shuttle import Shuttle
from .date import Date
from django.contrib.auth.models import User


class ShuttleDate(models.Model):

    date = models.ForeignKey(Date, on_delete=models.DO_NOTHING)
    shuttle = models.ForeignKey(Shuttle, on_delete=models.DO_NOTHING)

    class Meta:
        verbose_name = ("shuttledate")
        verbose_name_plural = ("shuttledates")

    def __str__(self):
        return f'{self.date}'

    def get_absolute_url(self):
        return reverse("shuttledate_detail", kwargs={"pk": self.pk})
