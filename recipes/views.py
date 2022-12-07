from .models import Recipe
from .serializers.common import RecipeSerializer # convert data on query to python data type
from .serializers.populated import PopulatedRecipeSerializer

from rest_framework.views import APIView #predefined view class to set http verb methods
from rest_framework.response import Response #to end an active req by writing to stream and sending back headers t client, like json() method
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

# Create your views here.
class RecipeListView(APIView):
  # permission_classes = (IsAuthenticatedOrReadOnly, )
  def get(self, _request):
      recipes = Recipe.objects.all()
      serialized_recipes = RecipeSerializer(recipes, many=True)
      return Response(serialized_recipes.data, status.HTTP_200_OK)

  def post(self, request):
      new_recipe = RecipeSerializer(data=request.data)
      try:
        if new_recipe.is_valid():
          new_recipe.save()
          return Response(new_recipe.data, status.HTTP_201_CREATED)
        else: 
          return Response(new_recipe.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
      except Exception as e:
        return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)


class RecipeDetailView(APIView):
  # permission_classes = (IsAuthenticatedOrReadOnly, )
  def get_recipe(self, pk):
      try:
        return Recipe.objects.get(pk=pk)
      except Recipe.DoesNotExist as e:
        raise NotFound(str(e))
      except Exception as e:
        return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  def get(self, _request, pk):
      recipe = self.get_recipe(pk)
      recipe = PopulatedRecipeSerializer(recipe)
      return Response(recipe.data)

  def put(self, request, pk):
      recipe = self.get_recipe(pk)
      try:
        recipe = RecipeSerializer(recipe, request.data, partial=True)
        if recipe.is_valid():
          recipe.save()
          return Response(recipe.data, status.HTTP_202_ACCEPTED)
        else:
          return Response(recipe.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
      except Exception as e:
        return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  def delete(self, _request, pk):
      recipe = self.get_recipe(pk)
      try:
          recipe.delete()
          return Response(status=status.HTTP_204_NO_CONTENT)
      except Exception as e:
        return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)
   