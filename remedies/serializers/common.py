from ..models import Remedy
from rest_framework import serializers


class RemedySerializer(serializers.ModelSerializer):
    class Meta:
      model = Remedy
      fields = '__all__'
