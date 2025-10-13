from rest_framework import serializers
from .models import Reclamo
from autenticacion.models import Usuarios


class ReclamoBaseSerializer(serializers.ModelSerializer):
    usuario = serializers.SerializerMethodField()
    
    idUsuario = serializers.PrimaryKeyRelatedField(
        queryset=Usuarios.objects.all(), 
       
    )

    def get_usuario(self, obj):
        if obj.idUsuario:
            return f"{obj.idUsuario.nombre} {obj.idUsuario.apellido}"
        return None

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


class ReclamoUserSerializer(ReclamoBaseSerializer):
    
    class Meta(ReclamoBaseSerializer.Meta):
        read_only_fields = ['id', 'fechaHora', 'estado', 'usuario']


class ReclamoGestorSerializer(ReclamoBaseSerializer):
    
    class Meta(ReclamoBaseSerializer.Meta):
        fields = ReclamoBaseSerializer.Meta.fields + ['acciones']
        
        read_only_fields = [
            'id', 
            'idUsuario', 
            'usuario', 
            'descripcion', 
            'prioridad', 
            'fechaHora'
        ]