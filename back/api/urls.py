from django.urls import path
from .views import SensorListCreateView, SensorDetailView, AmbienteListCreateView, AmbienteDetailView, HistoricoListCreateView, HistoricoDetailView,  CriarSuperUsuarioAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('sensores/', SensorListCreateView.as_view()),
    path('sensores/<int:pk>/', SensorDetailView.as_view()),
    path('ambientes/', AmbienteListCreateView.as_view()),
    path('ambientes/<int:pk>/', AmbienteDetailView.as_view()),
    path('historicos/', HistoricoListCreateView.as_view()),
    path('historicos/<int:pk>/', HistoricoDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('register/', CriarSuperUsuarioAPIView.as_view())
]