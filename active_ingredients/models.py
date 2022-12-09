from django.db import models

# Create your models here.

class Active_Ingredient(models.Model):
    name = models.CharField(max_length=50)
    latin_name = models.CharField(max_length=50)
    common_names = models.CharField(max_length=100)
    image = models.CharField(max_length=300)
    bg_image = models.CharField(max_length=300, default=None, blank=True, null=True)
    description = models.TextField(max_length=10000)
    benefits = models.ManyToManyField(
        'benefits.Benefit',
        related_name="active_ingredients",
    )
    # mediums = models.ManyToManyField(
    #     'mediums.Medium',
    #     related_name="active_ingredients",
    # )

    def __str__(self):
        return f"{self.name}"

