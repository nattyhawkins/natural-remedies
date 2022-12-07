from comments.serializers.common import CommentSerializer
from .common import RecipeSerializer
from active_ingredients.serializers.common import Active_IngredientSerializer

class PopulatedRecipeSerializer(RecipeSerializer):
    comments = CommentSerializer(many=True)
    active_ingredients = Active_IngredientSerializer(many=True)
    # types = TypeSerializer(many=True)