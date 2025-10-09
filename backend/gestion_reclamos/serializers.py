from rest_framework import serializers
from .models import Reclamo

class ReclamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamo
        fields = [
            'id', 
            'id_usuario', 
            'usuario',
            'fecha_hora', 
            'estado', 
            'descripcion', 
            'prioridad'
        ]
        read_only_fields = ('fecha_hora', 'estado', 'id')