from .models import Recipe
from .serializers.common import RecipeSerializer # convert data on query to python data type
from .serializers.populated import PopulatedRecipeSerializer, SemiPopulatedRecipeSerializer

from rest_framework.views import APIView #predefined view class to set http verb methods
from rest_framework.response import Response #to end an active req by writing to stream and sending back headers t client, like json() method
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class RecipeListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
  def get(self, request):
      # try:
        search = request.query_params.get('search')
        benefit = request.query_params.get('benefit')
        benefit = benefit if benefit != 'default' else ''
        print('benefit--', benefit)
        recipes = Recipe.objects.filter(name__icontains=search, active_ingredients__benefits__name__icontains=benefit).distinct()
        serialized_recipes = SemiPopulatedRecipeSerializer(recipes, many=True)
        # if len(serialized_recipes.data) == 0:
        #   raise NotFound('No matches, please try something else...')
        return Response(serialized_recipes.data, status.HTTP_200_OK)

  def post(self, request):
      request.data['owner'] = request.user.id
      try:
        new_recipe = RecipeSerializer(data=request.data)
        if new_recipe.is_valid():
          new_recipe.save()
          return Response(new_recipe.data, status.HTTP_201_CREATED)
        else: 
          return Response(new_recipe.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
      except Exception as e:
        return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)


class RecipeDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
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
        if recipe.owner != request.user:
            raise PermissionDenied('Unauthorised')

        if recipe.is_valid():
          recipe.save()
          return Response(recipe.data, status.HTTP_202_ACCEPTED)
        else:
          return Response(recipe.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
      except Exception as e:
        return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  def delete(self, request, pk):
      try:
        recipe = self.get_recipe(pk)
        if recipe.owner != request.user:
          raise PermissionDenied('Unauthorised')

        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
      except Exception as e:
        return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  # favourite
  # def post(self, request, pk):
  #     # return Response(print('incoming---', request.user.id))
  #     request.data['owner'] = request.user.id
  #     recipe = self.get_recipe(pk)
  #     try:
  #       fav_owner = UserSerializer(pk=request.user.id)
  #       if fav_owner.is_valid():
  #         if 
  #         fav_owner.save()
  #         return Response(fav_owner.data, status.HTTP_201_CREATED)
  #       else: 
  #         return Response(fav_owner.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
  #     except Exception as e:
  #       return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  #     except Recipe.DoesNotExist as e:
  #       return Response(str(e))

      # request.data['owner'] = request.user.id
      # try:
      #   new_recipe = RecipeSerializer(data=request.data)
      #   if new_recipe.is_valid():
      #     new_recipe.save()
      #     return Response(new_recipe.data, status.HTTP_201_CREATED)
      #   else: 
      #     return Response(new_recipe.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
      # except Exception as e:
      #   return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)