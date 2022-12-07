from .models import Medium
from .serializers.populated import PopulatedMediumSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class MediumListView(APIView):
    def get(self, request):
        mediums = Medium.objects.all()
        mediums = PopulatedMediumSerializer(mediums, many=True)
        return Response(mediums.data)