from rest_framework import serializers
from .models import Reclamo, GestionReclamo

class ReclamoSerializer(serializers.ModelSerializer):
    
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
            'usuario_gestor',   
            'nota',             
            'fecha_gestion'    
        ]
        # Campos de solo lectura
        read_only_fields = ('fecha_gestion', 'id')