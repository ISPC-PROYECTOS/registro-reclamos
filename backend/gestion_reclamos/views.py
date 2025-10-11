from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Reclamo
# Importamos ambos serializadores para poder usarlos condicionalmente
from .serializers import ReclamoUserSerializer, ReclamoGestorSerializer 


# --- Vistas de Reclamo ---

class ReclamoListCreateView(generics.ListCreateAPIView):
    
    queryset = Reclamo.objects.all()
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        
        return ReclamoUserSerializer


class ReclamoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = Reclamo.objects.all()
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        
        if self.request.method in ['PATCH', 'PUT']:
            # Solo permite editar el campo 'estado'
            return ReclamoGestorSerializer
        
        # Para GET (detalle), listamos todos los campos
        return ReclamoUserSerializer
