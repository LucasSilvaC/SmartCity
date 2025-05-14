from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework import status

from .models import (
    User,
    Sensor,
    Ambiente,
    HistoricoTemperatura,
    HistoricoUmidade,
    HistoricoLuminosidade,
    HistoricoContador
)
from .serializers import (
    SensorSerializer,
    AmbienteSerializer,
    HistoricoTemperaturaSerializer,
    HistoricoUmidadeSerializer,
    HistoricoLuminosidadeSerializer,
    HistoricoContadorSerializer,
)

# Criação de superusuário
class CriarUsuarioAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response({'erro': 'Usuário e senha são obrigatórios'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'erro': 'Usuário já existe'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_superuser(username=username, password=password)
        refresh = RefreshToken.for_user(user)
        return Response({
            'mensagem': 'Superusuário criado com sucesso!',
            'access_token': str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)


# Sensor Views
class SensorListCreateView(ListCreateAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [IsAuthenticated]

class SensorDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [IsAuthenticated]


# Ambiente Views
class AmbienteListCreateView(ListCreateAPIView):
    queryset = Ambiente.objects.all().order_by('sig')
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]

class AmbienteDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]


# Histórico Temperatura
class HistoricoTemperaturaListCreateView(ListCreateAPIView):
    queryset = HistoricoTemperatura.objects.all().order_by('-timestamp')
    serializer_class = HistoricoTemperaturaSerializer
    permission_classes = [IsAuthenticated]

class HistoricoTemperaturaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = HistoricoTemperatura.objects.all()
    serializer_class = HistoricoTemperaturaSerializer
    permission_classes = [IsAuthenticated]


# Histórico Umidade
class HistoricoUmidadeListCreateView(ListCreateAPIView):
    queryset = HistoricoUmidade.objects.all().order_by('-timestamp')
    serializer_class = HistoricoUmidadeSerializer
    permission_classes = [IsAuthenticated]

class HistoricoUmidadeDetailView(RetrieveUpdateDestroyAPIView):
    queryset = HistoricoUmidade.objects.all()
    serializer_class = HistoricoUmidadeSerializer
    permission_classes = [IsAuthenticated]


# Histórico Luminosidade
class HistoricoLuminosidadeListCreateView(ListCreateAPIView):
    queryset = HistoricoLuminosidade.objects.all().order_by('-timestamp')
    serializer_class = HistoricoLuminosidadeSerializer
    permission_classes = [IsAuthenticated]

class HistoricoLuminosidadeDetailView(RetrieveUpdateDestroyAPIView):
    queryset = HistoricoLuminosidade.objects.all()
    serializer_class = HistoricoLuminosidadeSerializer
    permission_classes = [IsAuthenticated]


# Histórico Contador
class HistoricoContadorListCreateView(ListCreateAPIView):
    queryset = HistoricoContador.objects.all().order_by('-timestamp')
    serializer_class = HistoricoContadorSerializer
    permission_classes = [IsAuthenticated]

class HistoricoContadorDetailView(RetrieveUpdateDestroyAPIView):
    queryset = HistoricoContador.objects.all()
    serializer_class = HistoricoContadorSerializer
    permission_classes = [IsAuthenticated]