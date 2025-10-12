from rest_framework import serializers
from .models import Reclamo



class ReclamoUserSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Reclamo
        fields = [
            'id', 
            'idUsuario', 
            'usuario', 
            'descripcion', 
            'prioridad',
            'estado', 
            'fechaHora'
        ]
        
        read_only_fields = ['id', 'fechaHora', 'estado']


# --- 2. Serializador para el Gestor (Actualización de Estado) ---

class ReclamoGestorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Reclamo
        fields = [
            'id', 
            'idUsuario', 
            'usuario', 
            'descripcion', 
            'prioridad',
            'estado', 
            'fechaHora'
        ]
        
        read_only_fields = [
            'id', 
            'idUsuario', 
            'usuario', 
            'descripcion', 
            'prioridad', 
            'fechaHora'
        ]