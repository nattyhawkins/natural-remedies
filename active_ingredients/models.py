from django.db import models

class Active_Ingredient(models.Model):
    name = models.CharField(max_length=50)
    latin_name = models.CharField(max_length=50)
    image = models.CharField(max_length=300)
    bg_image = models.CharField(max_length=300, default=None, blank=True, null=True)
    description = models.TextField(max_length=50000)
    benefits = models.ManyToManyField(
        'benefits.Benefit',
        related_name="active_ingredients",
    )

    def __str__(self):
        return f"{self.name}"

