from .models import Remedy
from .serializers.common import RemedySerializer # convert data on query to python data type
from .serializers.populated import PopulatedRemedySerializer

from rest_framework.views import APIView #predefined view class to set http verb methods
from rest_framework.response import Response #to end an active req by writing to stream and sending back headers t client, like json() method
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

# Create your views here.
class RemedyListView(APIView):
  # permission_classes = (IsAuthenticatedOrReadOnly, )
  def get(self, _request):
      remedies = Remedy.objects.all()
      serialized_remedies = RemedySerializer(remedies, many=True)
      return Response(serialized_remedies.data, status.HTTP_200_OK)

  # def post(self, request):
  #     new_remedy = RemedySerializer(data=request.data)
  #     try:
  #       if new_remedy.is_valid():
  #         new_remedy.save()
  #         return Response(new_remedy.data, status.HTTP_201_CREATED)
  #       else: 
  #         return Response(new_remedy.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
  #     except Exception as e:
  #       return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)


class RemedyDetailView(APIView):
  # permission_classes = (IsAuthenticatedOrReadOnly, )
  def get_remedy(self, pk):
      try:
        return Remedy.objects.get(pk=pk)
      except Remedy.DoesNotExist as e:
        raise NotFound(str(e))
      except Exception as e:
        return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  def get(self, _request, pk):
      remedy = self.get_remedy(pk)
      remedy = PopulatedRemedySerializer(remedy)
      return Response(remedy.data)

  # def put(self, request, pk):
  #     remedy = self.get_remedy(pk)
  #     try:
  #       remedy = RemedySerializer(remedy, request.data, partial=True)
  #       if remedy.is_valid():
  #         remedy.save()
  #         return Response(remedy.data, status.HTTP_202_ACCEPTED)
  #       else:
  #         return Response(remedy.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
  #     except Exception as e:
  #       return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

  # def delete(self, _request, pk):
  #     remedy = self.get_remedy(pk)
  #     try:
  #         remedy.delete()
  #         return Response(status=status.HTTP_204_NO_CONTENT)
  #     except Exception as e:
  #       return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)
   