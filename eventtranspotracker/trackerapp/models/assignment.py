from django.db import models
from django.urls import reverse
from .driver import Driver
from .vehicle import Vehicle
from .route import Route
from .date import Date
from django.contrib.auth.models import User


class Assignment(models.Model):

    start_time = models.TimeField()
    end_time = models.TimeField()
    driver = models.ForeignKey(Driver, on_delete=models.DO_NOTHING)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.DO_NOTHING)
    route = models.ForeignKey(Route, on_delete=models.DO_NOTHING)
    date = models.ForeignKey(Date, on_delete=models.DO_NOTHING)

    class Meta:
        verbose_name = ("assignment")
        verbose_name_plural = ("assignments")

    def __str__(self):
        return f'{self.driver} {self.vehicle} {self.route} {self.date}'

    def get_absolute_url(self):
        return reverse("assignment_detail", kwargs={"pk": self.pk})
