from .common import BenefitSerializer
from remedies.serializers.common import RemedySerializer

class PopulatedBenefitSerializer(BenefitSerializer):
    remedies = RemedySerializer(many=True)