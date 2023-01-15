from django.db import models
# from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Recipe(models.Model):
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=300)
    description = models.TextField(max_length=2000)
    active_ingredients = models.ManyToManyField(
        'active_ingredients.Active_Ingredient',
        related_name="recipes",
        default=None, blank=True,
    )
    inventory = models.TextField(max_length=2000)
    steps = models.TextField(max_length=10000)
    mediums = models.ManyToManyField(
        'mediums.Medium',
        related_name="recipes",
        default=None, blank=True,
    )
    owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='recipes',
    on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.name}"
