from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # Autenticação
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('register/', views.CriarUsuarioAPIView.as_view()),
    path('redefinir_senha/', views.ResetPasswordAPIView.as_view()),

    # Sensor
    path('sensores/', views.SensorListCreateView.as_view()),
    path('sensor/<int:pk>/', views.SensorDetailView.as_view()),
    path('sensores/upload_xlsx/', views.UploadXLSXViewSensor.as_view()),
    path('sensores/exportar_xlsx/', views.exportar_xlsx_sensores),

    # Ambiente
    path('ambientes/', views.AmbienteListCreateView.as_view()),
    path('ambiente/<int:pk>/', views.AmbienteDetailView.as_view()),
    path('ambientes/upload_xlsx/', views.UploadXLSXViewAmbiente.as_view()),
    path('ambientes/exportar_xlsx/', views.exportar_xlsx_ambientes),

    # Histórico
    path('historicos/', views.HistoricoListCreateView.as_view()),
    path('historico/<int:pk>/', views.HistoricoDetailView.as_view()),
    path('historicos/upload_xlsx/', views.UploadXLSXViewHistorico.as_view()),
    path('historicos/exportar_xlsx/', views.exportar_historico_excel),
]