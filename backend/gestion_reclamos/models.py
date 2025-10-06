from django.db import models

from django.db import models

class GestionReclamo(models.Model):
   
    id_usuario = models.CharField(max_length=255)
    
    nombre_usuario = models.CharField(max_length=255)
    
    fecha_hora = models.DateTimeField(auto_now_add=True) 
    
    ESTADOS = [
        ('Recibido', 'Recibido'),
        ('En Proceso', 'En Proceso'),
        ('Resuelto', 'Resuelto'),
        ('Cerrado', 'Cerrado'),
    ]
    estado = models.CharField(max_length=50, choices=ESTADOS, default='Recibido')
    
    descripcion = models.TextField(max_length=300)
    
    PRIORIDADES = [
        ('baja', 'Baja'),
        ('media', 'Media'),
        ('alta', 'Alta'),
    ]
    prioridad = models.CharField(max_length=50, choices=PRIORIDADES)

    def __str__(self):
        return f"Reclamo {self.id}: {self.descripcion[:30]}..."

    class Meta:
        verbose_name_plural = "Reclamos"
        ordering = ['-fecha_hora']
