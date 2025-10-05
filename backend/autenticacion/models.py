from django.db import models
from django.core.validators import RegexValidator

class Roles(models.TextChoices):
    AGENTE = 'agente', 'Agente'
    USUARIO = 'usuario', 'Usuario'
class Usuario(models.Model):
    
    id = models.AutoField(primary_key=True, help_text="ID único del usuario.")
    nombre = models.CharField(max_length=30, null=False, help_text="Nombre del usuario.")
    apellido = models.CharField(max_length=30, null=False, help_text="Apellido del usuario.")
    area = models.CharField(max_length=10, null=False, help_text="Área del usuario.")
    email = models.EmailField(unique=True, null=False, validators=[RegexValidator(r'^\d{8,100}$')], help_text="Correo electrónico único.")
    password = models.CharField(max_length=255, null=False, help_text="Contraseña del usuario.")
    rol = models.CharField(max_length=10, choices=Roles.choices, null=False, default=Roles.USUARIO, help_text="Rol del usuario.")
    
    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.email}"
    
    class Meta:
        db_table = 'usuarios'