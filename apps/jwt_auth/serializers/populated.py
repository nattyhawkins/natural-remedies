from comments.serializers.populated import RelatedCommentSerializer
from .common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    comments = RelatedCommentSerializer(many=True)