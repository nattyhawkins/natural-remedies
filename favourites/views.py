from .serializers.common import FavouriteSerializer
from .models import Favourite
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class FavouriteListView(APIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        request.data['owner'] = request.user.id
        print(request.data)
        try:
          # set = request.data[0]
          existing_favourite = Favourite.objects.get(owner=request.user.id, active_ingredient=request.data['active_ingredient'], recipe=request.data['recipe'])
          existing_favourite.delete()
          return Response(status=status.HTTP_204_NO_CONTENT)
        except Favourite.DoesNotExist as e:
          new_favourite = FavouriteSerializer(data=request.data)
          if new_favourite.is_valid():
            new_favourite.save()
            return Response(new_favourite.data, status.HTTP_201_CREATED)
          return Response(new_favourite.errors, status.HTTP_204_NO_CONTENT)
        except Exception as e:
          return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)