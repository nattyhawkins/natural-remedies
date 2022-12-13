from .common import Active_IngredientSerializer
from benefits.serializers.common import BenefitSerializer

class FavePopulatedActive_IngredientSerializer(Active_IngredientSerializer):
    benefits = BenefitSerializer(many=True)