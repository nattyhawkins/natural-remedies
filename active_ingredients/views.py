from .models import Active_Ingredient
from .serializers.common import Active_IngredientSerializer # convert data on query to python data type
from .serializers.populated import PopulatedActive_IngredientSerializer

from rest_framework.views import APIView #predefined view class to set http verb methods
from rest_framework.response import Response #to end an active req by writing to stream and sending back headers t client, like json() method
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

# Create your views here.
class Active_IngredientListView(APIView):
  # permission_classes = (IsAuthenticatedOrReadOnly, )
  def get(self, _request):
      active_ingredients = Active_Ingredient.objects.all()
      serialized_active_ingredients = Active_IngredientSerializer(active_ingredients, many=True)
      return Response(serialized_active_ingredients.data, status.HTTP_200_OK)

  # def post(self, request):
  #     new_active_ingredient = Active_IngredientSerializer(data=request.data)
  #     try:
  #       if new_active_ingredient.is_valid():
  #         new_active_ingredient.save()
  #         return Response(new_active_ingredient.data, status.HTTP_201_CREATED)
  #       else: 
  #         return Response(new_active_ingredient.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
  #     except Exception as e:
  #       return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)


class Active_IngredientDetailView(APIView):
  # permission_classes = (IsAuthenticatedOrReadOnly, )
  def get_active_ingredient(self, pk):
      try:
        return Active_Ingredient.objects.get(pk=pk)
      except Active_Ingredient.DoesNotExist as e:
        raise NotFound(str(e))
      except Exception as e:
        return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  def get(self, _request, pk):
      active_ingredient = self.get_active_ingredient(pk)
      active_ingredient = PopulatedActive_IngredientSerializer(active_ingredient)
      return Response(active_ingredient.data)

  # def put(self, request, pk):
  #     active_ingredient = self.get_active_ingredient(pk)
  #     try:
  #       active_ingredient = Active_IngredientSerializer(active_ingredient, request.data, partial=True)
  #       if active_ingredient.is_valid():
  #         active_ingredient.save()
  #         return Response(active_ingredient.data, status.HTTP_202_ACCEPTED)
  #       else:
  #         return Response(active_ingredient.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
  #     except Exception as e:
  #       return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  # def delete(self, _request, pk):
  #     active_ingredient = self.get_active_ingredient(pk)
  #     try:
  #         active_ingredient.delete()
  #         return Response(status=status.HTTP_204_NO_CONTENT)
  #     except Exception as e:
  #       return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)
   