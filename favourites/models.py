from django.db import models

# Create your models here.
class Favourite(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    active_ingredient = models.ForeignKey(
      'active_ingredients.Active_Ingredient',
      related_name = 'favourites',
      on_delete = models.CASCADE,
      default=None, blank=True, null=True
    )
    recipe = models.ForeignKey(
      'recipes.Recipe',
      related_name = 'favourites',
      on_delete = models.CASCADE,
      default=None, blank=True, null=True
    )
    owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='favourites',
    on_delete=models.CASCADE,
    )

    def __str__(self):
        reference = self.active_ingredient if self.active_ingredient else self.recipe
        return f"{self.owner} - {reference}"