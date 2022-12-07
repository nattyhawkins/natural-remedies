from .common import Active_IngredientSerializer
from benefits.serializers.common import BenefitSerializer
from comments.serializers.common import CommentSerializer

class PopulatedActive_IngredientSerializer(Active_IngredientSerializer):
    comments = CommentSerializer(many=True)
    benefits = BenefitSerializer(many=True)
    # methods = MethodSerializer(many=True)