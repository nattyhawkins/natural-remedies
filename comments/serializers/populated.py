from .common import CommentSerializer
from jwt_auth.serializers.common import UserSerializer
from active_ingredients.serializers.common import Active_IngredientSerializer
from recipes.serializers.common import RecipeSerializer

class OwnedCommentSerializer(CommentSerializer):
    owner = UserSerializer()

class RelatedCommentSerializer(CommentSerializer):
    active_ingredient = Active_IngredientSerializer()
    recipe = RecipeSerializer()