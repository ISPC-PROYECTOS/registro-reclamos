from django.db import models
from django.conf import settings

# Constantes para Reclamo y Gestión
ESTADOS_RECLAMO = [
    ('Recibido', 'Recibido'),
    ('En Proceso', 'En Proceso'),
    ('Resuelto', 'Resuelto'),
    ('Cerrado', 'Cerrado'),
]

PRIORIDADES_RECLAMO = [
    ('baja', 'Baja'),
    ('media', 'Media'),
    ('alta', 'Alta'),
]

# --- 1. Modelo Principal: El Reclamo ---
class Reclamo(models.Model):
    """
    Representa el reclamo inicial ingresado por el usuario.
    """
    # Datos de quién realiza el reclamo
    id_usuario = models.CharField(max_length=255, verbose_name="ID del Usuario que reporta")
    nombre_usuario = models.CharField(max_length=255, verbose_name="Nombre del Usuario que reporta")
    
    # Datos del reclamo
    descripcion = models.TextField(max_length=500, verbose_name="Descripción del Reclamo")
    prioridad = models.CharField(
        max_length=50, 
        choices=PRIORIDADES_RECLAMO, 
        default='baja', 
        verbose_name="Prioridad Asignada"
    )
    
    # Datos de seguimiento (iniciales)
    fecha_hora = models.DateTimeField(auto_now_add=True, verbose_name="Fecha/Hora de Creación") 
    estado = models.CharField(
        max_length=50, 
        choices=ESTADOS_RECLAMO, 
        default='Recibido', 
        verbose_name="Estado Actual"
    )

    def __str__(self):
        return f"Reclamo #{self.id} ({self.estado})"

    class Meta:
        verbose_name_plural = "Reclamos"
        ordering = ['-fecha_hora']


# --- 2. Modelo de Seguimiento: Historial de Gestión ---
class GestionReclamo(models.Model):
    """
    Registra cada acción, nota o cambio de estado realizado por un gestor 
    sobre un reclamo específico (historial).
    """
    # Relación con el Reclamo
    reclamo = models.ForeignKey(
        Reclamo, 
        on_delete=models.CASCADE, 
        related_name='historial_gestion',
        verbose_name="Reclamo Asociado"
    )
    
    # Datos de la acción de gestión
    usuario_gestion = models.CharField(max_length=150, verbose_name="Usuario Gestor")
    nota = models.TextField(verbose_name="Nota de Gestión o Resolución", blank=True, null=True)
    fecha_gestion = models.DateTimeField(auto_now_add=True, verbose_name="Fecha/Hora de Gestión") 

    def __str__(self):
        return f"Gestión de Reclamo #{self.reclamo.id} por {self.usuario_gestion}"

    class Meta:
        verbose_name_plural = "Gestiones de Reclamos"
        ordering = ['-fecha_gestion']