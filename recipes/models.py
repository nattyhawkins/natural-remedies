from django.db import models

# Create your models here.

class Recipe(models.Model):
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=300)
    description = models.CharField(max_length=1000)
    active_ingredients = models.ManyToManyField(
        'active_ingredients.Active_Ingredient',
        related_name="active_ingredients",
    )
    other_ingredients = models.CharField(max_length=500)
    method = models.CharField(max_length=1000)
    # type = models.ManyToManyField(
    #     'types.Type',
    #     related_name="active_ingredients",
    # )

    def __str__(self):
        return f"{self.name}"

