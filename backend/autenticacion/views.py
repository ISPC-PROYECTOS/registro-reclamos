from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuarios
from .serializers import UsuarioSerializer, UsuarioLoginSerializer

class InicioSesionView(APIView):
    def post(self, request):
        serializer = UsuarioLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            
            try:
                usuario = Usuarios.objects.get(email=email, password=password)
                usuario_serializer = UsuarioSerializer(usuario)
                return Response(usuario_serializer.data, status=status.HTTP_200_OK)
            except Usuarios.DoesNotExist:
                return Response([], status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerificarEmailView(APIView):
    def get(self, request):
        email = request.query_params.get('email')
        if not email:
            return Response({'error': 'Email requerido'}, status=status.HTTP_400_BAD_REQUEST)
        
        existe = Usuarios.objects.filter(email=email).exists()
        return Response({'existe': existe}, status=status.HTTP_200_OK)

class RegistroView(APIView):
    def post(self, request):
        # Verificar si el email ya existe
        email = request.data.get('email')
        if Usuarios.objects.filter(email=email).exists():
            return Response(
                {'type': 'EMAIL_DUPLICADO', 'message': 'Este email ya está registrado'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.save()
            return Response(UsuarioSerializer(usuario).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)