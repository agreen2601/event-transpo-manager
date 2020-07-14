from django.db import models
from django.urls import reverse


class Vehicle(models.Model):

    company = models.CharField(max_length=50)
    number = models.CharField(max_length=50)
    kind = models.CharField(max_length=50)
    capacity = models.IntegerField()
    isAda = models.BooleanField(default=False)

    class Meta:
        verbose_name = ("vehicle")
        verbose_name_plural = ("vehicle")

    def __str__(self):
        return f'{self.company} {self.number} {self.capacity}'

    def get_absolute_url(self):
        return reverse("vehicle_detail", kwargs={"pk": self.pk})
