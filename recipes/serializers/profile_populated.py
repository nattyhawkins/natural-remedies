from active_ingredients.serializers.profile_populated import FavePopulatedActive_IngredientSerializer
from mediums.serializers.common import MediumSerializer
from .common import RecipeSerializer
from favourites.serializers.common import FavouriteSerializer


class FavePopulatedRecipeSerializer(RecipeSerializer):
    favourites = FavouriteSerializer(many=True)
    active_ingredients = FavePopulatedActive_IngredientSerializer(many=True)
    mediums = MediumSerializer(many=True)