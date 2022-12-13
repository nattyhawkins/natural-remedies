from comments.serializers.populated import RelatedCommentSerializer
from .common import UserSerializer
from favourites.serializers.populated import RelatedFavouriteSerializer

class PopulatedUserSerializer(UserSerializer):
    comments = RelatedCommentSerializer(many=True)
    favourites = RelatedFavouriteSerializer(many=True)