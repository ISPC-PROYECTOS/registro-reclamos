from rest_framework import serializers
from .models import Reclamo



class ReclamoUserSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Reclamo
        fields = [
            'id', 
            'id_usuario', 
            'usuario', 
            'descripcion', 
            'prioridad',
            'estado', 
            'fecha_hora'
        ]
        
        read_only_fields = ['id', 'fecha_hora', 'estado']


# --- 2. Serializador para el Gestor (Actualización de Estado) ---

class ReclamoGestorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Reclamo
        fields = [
            'id', 
            'id_usuario', 
            'usuario', 
            'descripcion', 
            'prioridad',
            'estado', 
            'fecha_hora'
        ]
        
        read_only_fields = [
            'id', 
            'id_usuario', 
            'usuario', 
            'descripcion', 
            'prioridad', 
            'fecha_hora'
        ]