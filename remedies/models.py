from django.db import models

# Create your models here.

class Remedy(models.Model):
    name = models.CharField(max_length=50)
    latin_name = models.CharField(max_length=50)
    common_names = models.CharField(max_length=100)
    image = models.CharField(max_length=300)
    bg_image = models.CharField(max_length=300, default=None, blank=True, null=True)
    description = models.CharField(max_length=1000)
    benefits = models.ManyToManyField(
        'benefits.Benefit',
        related_name="remedies",
    )
    # methods = models.ManyToManyField(
    #     'methods.Method',
    #     related_name="remedies",
    # )

    def __str__(self):
        return f"{self.name}"
