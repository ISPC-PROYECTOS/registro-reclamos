from django.db import models
# from django.contrib.auth.models import User  # Si se usa autenticación de usuarios

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


class Reclamo(models.Model):
    
    
    usuario = models.CharField(max_length=255, verbose_name="Nombre del Usuario que realiza el reclamo")
    descripcion = models.TextField(max_length=500, verbose_name="Descripción del reclamo")
    
 
    idUsuario = models.CharField(max_length=255, verbose_name="ID del Usuario que realiza el reclamo", default="Desconocido")
    fechaHora = models.DateTimeField(auto_now_add=True, verbose_name="Fecha y Hora de Creación")
    
 
    estado = models.CharField(max_length=50, choices=ESTADOS_RECLAMO, default='Recibido', verbose_name="Estado Actual")
    prioridad = models.CharField(max_length=50, choices=PRIORIDADES_RECLAMO, default='media')
    

    def __str__(self):
        return f"Reclamo {self.id} ({self.estado}): {self.usuario}"

    class Meta:
        verbose_name_plural = "Reclamos"
        ordering = ['-fecha_hora']
       