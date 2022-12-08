from django.db import models

# Create your models here.
class Comment(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    active_ingredient = models.ForeignKey(
      'active_ingredients.Active_Ingredient',
      related_name = 'comments',
      on_delete = models.CASCADE,
      default=None, blank=True, null=True
    )
    recipe = models.ForeignKey(
      'recipes.Recipe',
      related_name = 'comments',
      on_delete = models.CASCADE,
      default=None, blank=True, null=True
    )
    owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='comments',
    on_delete=models.CASCADE
    )

    def __str__(self):
        reference = f"Ingredient - {self.active_ingredient}" if self.active_ingredient else f"Recipe - {self.recipe}" 
        return f"{reference} ({self.id})"