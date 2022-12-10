from django_filters import rest_framework as filters
from ..models import Active_Ingredient

class searchFilter(filters.FilterSet):
    name = filters.CharFilter()

    class Meta:
        model = Active_Ingredient
        fields = ['name', ]