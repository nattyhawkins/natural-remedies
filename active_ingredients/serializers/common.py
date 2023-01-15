from ..models import Active_Ingredient
from rest_framework import serializers

class Active_IngredientSerializer(serializers.ModelSerializer):
    class Meta:
      model = Active_Ingredient
      fields = '__all__'
