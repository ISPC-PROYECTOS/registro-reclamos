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
    
    descripcion = models.TextField(max_length=500, verbose_name="Descripción del reclamo")
    
 
    idUsuario =models.ForeignKey('autenticacion.Usuarios', on_delete=models.CASCADE, verbose_name="Usuario")
    fechaHora = models.DateTimeField(auto_now_add=True, verbose_name="Fecha y Hora de Creación")
    
 
    estado = models.CharField(max_length=50, choices=ESTADOS_RECLAMO, default='Recibido', verbose_name="Estado Actual")
    prioridad = models.CharField(max_length=50, choices=PRIORIDADES_RECLAMO, default='media')
    acciones = models.TextField(max_length=500, verbose_name="Descripción de la acción", null=True)
    

    def __str__(self):
        return f"Reclamo {self.id} ({self.estado}): {self.usuario}"

    class Meta:
        verbose_name_plural = "Reclamos"
        ordering = ['-fechaHora']
       