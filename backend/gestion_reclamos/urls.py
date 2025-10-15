from django.urls import path
from .views import ReclamoListCreateView, ReclamoRetrieveUpdateDestroyView

urlpatterns = [
    # GET y POST a /api/v1/reclamos/
    path('', ReclamoListCreateView.as_view(), name='reclamo-list-create'),
    # GET, PUT, DELETE a /api/v1/reclamos/<id>/
    path('<int:pk>/', ReclamoRetrieveUpdateDestroyView.as_view(), name='reclamo-detail'),
]
