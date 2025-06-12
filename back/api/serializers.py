from rest_framework import serializers
from .models import (
    Sensor,
    Ambiente,
    Historico,
    User  
)

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = ['id', 'sensor', 'mac_address', 'unidade_med', 'status', 'latitude', 'longitude']

class AmbienteSerializer(serializers.ModelSerializer):
   class Meta:
        model = Ambiente
        fields = ['id', 'sig', 'descricao', 'ni', 'responsavel']

class HistoricoSerializer(serializers.ModelSerializer):
    sensor = SensorSerializer(read_only=True)  

    class Meta:
        model = Historico
        fields = ['id', 'sensor', 'ambiente', 'valor', 'timestamp']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  
        fields = ['id', 'username']