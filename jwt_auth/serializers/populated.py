from comments.serializers.populated import RelatedCommentSerializer
from .common import UserSerializer
from favourites.serializers.populated import RelatedFavouriteSerializer
from recipes.serializers.populated import SemiPopulatedRecipeSerializer

class PopulatedUserSerializer(UserSerializer):
    comments = RelatedCommentSerializer(many=True)
    favourites = RelatedFavouriteSerializer(many=True)
    recipes = SemiPopulatedRecipeSerializer(many=True)