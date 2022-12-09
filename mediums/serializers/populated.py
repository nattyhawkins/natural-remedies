from .common import MediumSerializer
from active_ingredients.serializers.common import Active_IngredientSerializer
from recipes.serializers.common import RecipeSerializer

class PopulatedMediumSerializer(MediumSerializer):
    active_ingredients = Active_IngredientSerializer(many=True)
    recipes = RecipeSerializer(many=True)