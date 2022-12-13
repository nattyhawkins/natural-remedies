from .common import FavouriteSerializer
from active_ingredients.serializers.profile_populated import FavePopulatedActive_IngredientSerializer
from recipes.serializers.profile_populated import FavePopulatedRecipeSerializer

class RelatedFavouriteSerializer(FavouriteSerializer):
    active_ingredient = FavePopulatedActive_IngredientSerializer()
    recipe = FavePopulatedRecipeSerializer()
    