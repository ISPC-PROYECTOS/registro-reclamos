from rest_framework import generics
from .models import Reclamo
from .serializers import ReclamoUserSerializer, ReclamoGestorSerializer
from rest_framework.permissions import AllowAny

class ReclamoListCreateView(generics.ListCreateAPIView):
    queryset = Reclamo.objects.all()
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación

    def get_serializer_class(self):
        
        return ReclamoUserSerializer  # Usar el serializador para listado

class ReclamoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reclamo.objects.all()
    permission_classes = [AllowAny] 

    def get_serializer_class(self):

        if self.request.method in ['PATCH', 'PUT']:
        
            return ReclamoGestorSerializer  #Sólo permite editar el campo 'estado'
        
        return ReclamoUserSerializer  # Para GET (detalle), listamos todos los campos
    
