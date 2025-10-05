from django.urls import path
from . import views

urlpatterns = [
    path('inicio-sesion/', views.InicioSesionView.as_view()),
    path('verificar-email/', views.VerificarEmailView.as_view()),
    path('registro/', views.RegistroView.as_view()),
]