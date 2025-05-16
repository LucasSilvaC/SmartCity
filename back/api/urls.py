from django.urls import path
from .views import (
    CriarUsuarioAPIView,
    SensorListCreateView, SensorDetailView,
    AmbienteListCreateView, AmbienteDetailView,
    HistoricoTemperaturaListCreateView, HistoricoTemperaturaDetailView,
    HistoricoUmidadeListCreateView, HistoricoUmidadeDetailView,
    HistoricoLuminosidadeListCreateView, HistoricoLuminosidadeDetailView,
    HistoricoContadorListCreateView, HistoricoContadorDetailView, ResetPasswordAPIView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Autenticação
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('register/', CriarUsuarioAPIView.as_view()),
    path('redefinir_senha/', ResetPasswordAPIView.as_view()),

   # Sensor
    path('sensores/', SensorListCreateView.as_view()),
    path('sensor/<int:pk>/', SensorDetailView.as_view()),

    # Ambiente
    path('ambientes/', AmbienteListCreateView.as_view()),
    path('ambiente/<int:pk>/', AmbienteDetailView.as_view()),

    # Histórico de Temperatura
    path('historicos/temperaturas/', HistoricoTemperaturaListCreateView.as_view()),
    path('historico/temperatura/<int:pk>/', HistoricoTemperaturaDetailView.as_view()),

    # Histórico de Umidade
    path('historicos/umidades/', HistoricoUmidadeListCreateView.as_view()),
    path('historico/umidade/<int:pk>/', HistoricoUmidadeDetailView.as_view()),

    # Histórico de Luminosidade
    path('historicos/luminosidades/', HistoricoLuminosidadeListCreateView.as_view()),
    path('historico/luminosidade/<int:pk>/', HistoricoLuminosidadeDetailView.as_view()),

    # Histórico de Contador
    path('historicos/contadores/', HistoricoContadorListCreateView.as_view()),
    path('historico/contador/<int:pk>/', HistoricoContadorDetailView.as_view()),
]