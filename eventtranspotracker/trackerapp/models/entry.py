from django.db import models
from django.urls import reverse
from .route import Route
from .place import Place
from .shuttle import Shuttle
from .date import Date
from django.contrib.auth.models import User


class Entry(models.Model):

    date = models.ForeignKey(Date, on_delete=models.DO_NOTHING)
    time = models.TimeField()
    attendee_count = models.IntegerField()
    vehicle_number = models.CharField(max_length=50)
    place = models.ForeignKey(Place, on_delete=models.DO_NOTHING)
    shuttle = models.ForeignKey(Shuttle, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)

    class Meta:
        verbose_name = ("entry")
        verbose_name_plural = ("entries")

    def __str__(self):
        return f'{self.date} {self.time} {self.attendee_count} {self.vehicle_number}'

    def get_absolute_url(self):
        return reverse("entry_detail", kwargs={"pk": self.pk})
