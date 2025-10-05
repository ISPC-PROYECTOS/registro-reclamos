from django.db import models
from django.core.validators import RegexValidator

class Usuario(models.Model):
    ROLES = [
        ('agente', 'Agente'),
        ('usuario', 'Usuario'),
    ]

    nombre = models.CharField(max_length=30, null=False, help_text="Nombre del usuario.")
    apellido = models.CharField(max_length=30, null=False, help_text="Apellido del usuario.")
    area = models.CharField(max_length=10, null=False, help_text="Área del usuario.")
    email = models.EmailField(unique=True, null=False, validators=[RegexValidator(r'^\d{8,100}$')], help_text="Correo electrónico único.")
    password = models.CharField(max_length=255, null=False, help_text="Contraseña del usuario.")
    rol = models.CharField(max_length=10, choices=ROLES, null=False, default='usuario', help_text="Rol del usuario.")
    
    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.email}"
    
    class Meta:
        db_table = 'usuarios'