from .common import Active_IngredientSerializer
from benefits.serializers.common import BenefitSerializer
from favourites.serializers.common import FavouriteSerializer

class FavePopulatedActive_IngredientSerializer(Active_IngredientSerializer):
    favourites = FavouriteSerializer(many=True)
    benefits = BenefitSerializer(many=True)