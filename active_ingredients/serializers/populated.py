from .common import Active_IngredientSerializer
from benefits.serializers.common import BenefitSerializer
from comments.serializers.populated import OwnedCommentSerializer
from favourites.serializers.populated import OwnedFavouriteSerializer
from favourites.serializers.common import FavouriteSerializer
from recipes.serializers.common import RecipeSerializer

class PopulatedActive_IngredientSerializer(Active_IngredientSerializer):
    comments = OwnedCommentSerializer(many=True)
    favourites = OwnedFavouriteSerializer(many=True)
    benefits = BenefitSerializer(many=True)
    recipes = RecipeSerializer(many=True)

class SemiPopulatedActive_IngredientSerializer(Active_IngredientSerializer):
    favourites = FavouriteSerializer(many=True)
    benefits = BenefitSerializer(many=True)
