from django.urls import path
from .views import ReclamoListCreateView, ReclamoRetrieveUpdateDestroyView

urlpatterns = [
    path('', ReclamoListCreateView.as_view(), name='reclamo-list-create'),
    path('<int:pk>/', ReclamoRetrieveUpdateDestroyView.as_view(), name='reclamo-detail'),
    