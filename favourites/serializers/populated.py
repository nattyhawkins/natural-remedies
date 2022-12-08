from .common import FavouriteSerializer
from jwt_auth.serializers.common import UserSerializer
from active_ingredients.serializers.common import Active_IngredientSerializer
from recipes.serializers.common import RecipeSerializer

class OwnedFavouriteSerializer(FavouriteSerializer):
    owner = UserSerializer()

class RelatedFavouriteSerializer(FavouriteSerializer):
    active_ingredient = Active_IngredientSerializer()
    recipe = RecipeSerializer()