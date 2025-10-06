from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Reclamo, GestionReclamo
from .serializers import ReclamoSerializer, GestionReclamoSerializer

# --- Vistas para la gestión de Reclamos por el Usuario (Punto de entrada de datos) ---

class ReclamoListCreateView(generics.ListCreateAPIView):
    """
    Maneja:
    1. GET /api/reclamos/ -> Listar todos los reclamos (principalmente para administradores)
    2. POST /api/reclamos/ -> Crear un nuevo reclamo (desde el formulario del usuario)
    """
    queryset = Reclamo.objects.all()
    serializer_class = ReclamoSerializer
    # Usamos AllowAny aquí para que el formulario de carga de reclamos sea accesible sin login.
    permission_classes = [AllowAny] 

    def perform_create(self, serializer):
        """
        Guarda el objeto de reclamo, mapeando y ajustando los datos que vienen del frontend.
        """
        # El frontend envía: { idUsuario, usuario, descripcion, prioridad }
        # Mapeamos los campos del JSON a los campos del modelo de Django.
        
        # Obtenemos los datos del JSON (self.request.data)
        id_usuario = self.request.data.get('idUsuario')
        nombre_usuario = self.request.data.get('usuario')
        
        # Validamos que los campos esenciales existan antes de guardar
        if not id_usuario or not nombre_usuario:
             # Nota: En un entorno de producción, manejaríamos esto con una excepción HTTP 400
             print("ERROR: Falta idUsuario o nombre de usuario en la petición.")
             return 

        serializer.save(
            id_usuario=id_usuario,
            nombre_usuario=nombre_usuario,
            # El estado se establece automáticamente en 'Recibido' por el modelo
        )

# --- Vistas para la Gestión de Reclamos por el Administrador ---

class ReclamoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    Maneja:
    1. GET /api/reclamos/{pk}/ -> Obtener un reclamo específico
    2. PUT/PATCH /api/reclamos/{pk}/ -> Actualizar un reclamo (ej: cambiar estado)
    3. DELETE /api/reclamos/{pk}/ -> Eliminar un reclamo
    
    Esta vista debe estar restringida al personal administrativo.
    """
    queryset = Reclamo.objects.all()
    serializer_class = ReclamoSerializer
    # Asume que solo usuarios logueados pueden gestionar/actualizar los reclamos.
    # Si tienes roles de Admin, usarías una Permission personalizada aquí.
    permission_classes = [IsAuthenticated]
    
# --- Vistas para registrar las acciones de Gestión (Historial) ---

class GestionReclamoCreateView(generics.CreateAPIView):
    """
    Permite a un administrador registrar una nota o acción sobre un reclamo.
    POST /api/gestion/ -> Crear un nuevo registro de gestión
    """
    queryset = GestionReclamo.objects.all()
    serializer_class = GestionReclamoSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        """
        Asegura que el campo 'reclamo' (ForeignKey) se pase correctamente.
        El frontend debe enviar el ID del reclamo en el cuerpo de la petición.
        """
        # Si el usuario gestor no viene en el cuerpo, usamos el usuario autenticado
        usuario_gestor = self.request.data.get('usuario_gestor', self.request.user.username)
        
        # El campo 'reclamo' ya viene como FK ID en la petición JSON
        serializer.save(usuario_gestor=usuario_gestor)
