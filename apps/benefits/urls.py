from .views import BenefitListView
from django.urls import path

urlpatterns = [
  path('', BenefitListView.as_view())
]