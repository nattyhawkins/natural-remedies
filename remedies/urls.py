from django.urls import path
from .views import RemedyListView, RemedyDetailView

urlpatterns = [
  path('', RemedyListView.as_view()),
  path('<int:pk>/', RemedyDetailView.as_view())

]