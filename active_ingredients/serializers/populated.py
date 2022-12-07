from .common import Active_IngredientSerializer
from benefits.serializers.common import BenefitSerializer
from comments.serializers.common import CommentSerializer
from recipes.serializers.common import RecipeSerializer
from mediums.serializers.common import MediumSerializer

class PopulatedActive_IngredientSerializer(Active_IngredientSerializer):
    comments = CommentSerializer(many=True)
    benefits = BenefitSerializer(many=True)
    recipes = RecipeSerializer(many=True)
    mediums = MediumSerializer(many=True)