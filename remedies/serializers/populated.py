from .common import RemedySerializer
from benefits.serializers.common import BenefitSerializer

class PopulatedRemedySerializer(RemedySerializer):
    # reviews = ReviewSerializer(many=True)
    benefits = BenefitSerializer(many=True)
    # methods = MethodSerializer(many=True)