from django.urls import path
from .views import ReclamoListCreateView, ReclamoRetrieveUpdateDestroyView, GestionReclamoCreateView

urlpatterns = [
    # 1. Rutas para el modelo Reclamo (Crear y Listar)
    # GET /api/reclamos/ -> Lista de reclamos
    # POST /api/reclamos/ -> Crear un nuevo reclamo
    path('', ReclamoListCreateView.as_view(), name='reclamo-list-create'),

    # 2. Rutas para un Reclamo específico (Obtener, Actualizar, Eliminar)
    # GET /api/reclamos/1/ -> Obtener detalles del reclamo 1
    # PATCH /api/reclamos/1/ -> Actualizar el estado del reclamo 1
    path('<int:pk>/', ReclamoRetrieveUpdateDestroyView.as_view(), name='reclamo-detail'),

    # 3. Ruta para el modelo de Gestión (Historial)
    # POST /api/gestion/ -> Registrar una nota de gestión o cambio de estado
    path('gestion/', GestionReclamoCreateView.as_view(), name='gestion-create'),
]
