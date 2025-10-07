from rest_framework import serializers
from .models import Reclamo, GestionReclamo

class ReclamoSerializer(serializers.ModelSerializer):
    """
    Serializador principal para el modelo Reclamo. 
    Se utiliza para la creación (POST) y listado (GET) de reclamos.
    """
    class Meta:
        model = Reclamo
        fields = [
            'id', 
            'id_usuario', 
            'nombre_usuario', 
            'fecha_hora', 
            'estado', 
            'descripcion', 
            'prioridad'
        ]
       
        # El ID, la fecha de creación y el estado son generados por el backend.
        read_only_fields = ('fecha_hora', 'estado', 'id')


class GestionReclamoSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo GestionReclamo. Se usa para registrar acciones administrativas.
    """
    class Meta:
        model = GestionReclamo
        fields = [
            'id', 
            'reclamo',         
            'usuario_gestion', """ver"""
            'nota',             
            'fecha_gestion'    
        ]
        
        read_only_fields = ('fecha_gestion', 'id')
