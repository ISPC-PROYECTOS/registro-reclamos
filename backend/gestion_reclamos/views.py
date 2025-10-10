from rest_framework import generics
from .models import Reclamo
from .serializers import ReclamoSerializer
from rest_framework.permissions import AllowAny

class ReclamoListCreateView(generics.ListCreateAPIView):
    queryset = Reclamo.objects.all()
    serializer_class = ReclamoSerializer
    permission_classes = [AllowAny] 

class ReclamoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reclamo.objects.all()
    serializer_class = ReclamoSerializer
    permission_classes = [AllowAny] 