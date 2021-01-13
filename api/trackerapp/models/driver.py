from django.db import models
from django.urls import reverse
from .area import Area

class Driver(models.Model):

    name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    isLocal = models.BooleanField(default=False)
    notes = models.CharField(max_length=250)
    area = models.ForeignKey(Area, on_delete=models.DO_NOTHING)

    class Meta:
        verbose_name = ("driver")
        verbose_name_plural = ("drivers")

    def __str__(self):
        return f'{self.name} {self.phone_number}'

    def get_absolute_url(self):
        return reverse("driver_detail", kwargs={"pk": self.pk})
