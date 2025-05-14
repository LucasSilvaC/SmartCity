from rest_framework import serializers
from .models import (
    Sensor,
    Ambiente,
    HistoricoTemperatura,
    HistoricoUmidade,
    HistoricoLuminosidade,
    HistoricoContador,
    User  
)

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = '__all__'

class AmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambiente
        fields = '__all__'

class HistoricoTemperaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricoTemperatura
        fields = '__all__'

class HistoricoUmidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricoUmidade
        fields = '__all__'

class HistoricoLuminosidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricoLuminosidade
        fields = '__all__'

class HistoricoContadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricoContador
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  
        fields = ['id', 'username']
