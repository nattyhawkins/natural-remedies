from .common import BenefitSerializer
from active_ingredients.serializers.common import Active_IngredientSerializer

class PopulatedBenefitSerializer(BenefitSerializer):
    active_ingredients = Active_IngredientSerializer(many=True)