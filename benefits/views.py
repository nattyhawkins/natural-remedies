from .models import Benefit
from .serializers.populated import PopulatedBenefitSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class BenefitListView(APIView):
    def get(self, request):
        benefits = Benefit.objects.all()
        benefits = PopulatedBenefitSerializer(benefits, many=True)
        return Response(benefits.data)