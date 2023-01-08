from .models import Active_Ingredient
from .serializers.common import Active_IngredientSerializer # convert data on query to python data type
from .serializers.populated import PopulatedActive_IngredientSerializer, SemiPopulatedActive_IngredientSerializer

from rest_framework.views import APIView #predefined view class to set http verb methods
from rest_framework.response import Response #to end an active req by writing to stream and sending back headers t client, like json() method
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

# Create your views here.
class Active_IngredientListView(APIView):
  def get(self, request):
      search = request.query_params.get('search')
      includes = request.query_params.getlist('includes', '')
      benefit = request.query_params.get('benefit')
      benefit = benefit if benefit != 'default' else ''
      if includes[0] == '':
        active_ingredients = Active_Ingredient.objects.filter(
          name__icontains=search, 
          benefits__name__icontains=benefit,
          ).distinct()
      else:
        active_ingredients = Active_Ingredient.objects.filter(
          name__icontains=search, 
          benefits__name__icontains=benefit,
          name__in=includes 
          ).distinct()
      active_ingredients = SemiPopulatedActive_IngredientSerializer(active_ingredients, many=True)
      return Response(active_ingredients.data, status.HTTP_200_OK)


class Active_IngredientDetailView(APIView):
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
