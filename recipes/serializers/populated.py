from comments.serializers.populated import OwnedCommentSerializer
from favourites.serializers.populated import OwnedFavouriteSerializer
from favourites.serializers.common import FavouriteSerializer
from active_ingredients.serializers.common import Active_IngredientSerializer
from active_ingredients.serializers.populated import SemiPopulatedActive_IngredientSerializer
from mediums.serializers.common import MediumSerializer
from .common import RecipeSerializer

class PopulatedRecipeSerializer(RecipeSerializer):
    comments = OwnedCommentSerializer(many=True)
    favourites = OwnedFavouriteSerializer(many=True)
    active_ingredients = SemiPopulatedActive_IngredientSerializer(many=True)
    mediums = MediumSerializer(many=True)

class SemiPopulatedRecipeSerializer(RecipeSerializer):
    favourites = FavouriteSerializer(many=True)
    active_ingredients = SemiPopulatedActive_IngredientSerializer(many=True)
    mediums = MediumSerializer(many=True)