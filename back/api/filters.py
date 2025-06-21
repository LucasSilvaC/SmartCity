import django_filters
from .models import Historico, Sensor, Ambiente

class HistoricoFilter(django_filters.FilterSet):
    sensor = django_filters.CharFilter(field_name='sensor__sensor', lookup_expr='icontains')
    status = django_filters.BooleanFilter(field_name='sensor__status')  # <-- AQUI
    timestamp_after = django_filters.IsoDateTimeFilter(field_name='timestamp', lookup_expr='gte')
    timestamp_before = django_filters.IsoDateTimeFilter(field_name='timestamp', lookup_expr='lte')
    valor_min = django_filters.NumberFilter(field_name='valor', lookup_expr='gte')
    valor_max = django_filters.NumberFilter(field_name='valor', lookup_expr='lte')

    class Meta:
        model = Historico
        fields = ['sensor', 'status', 'timestamp_after', 'timestamp_before', 'valor_min', 'valor_max']

class SensorFilter(django_filters.FilterSet):
    status = django_filters.BooleanFilter()
    unidade_med = django_filters.ChoiceFilter(choices=Sensor.TIPO)

    class Meta:
        model = Sensor
        fields = ['status', 'unidade_med']


class AmbienteFilter(django_filters.FilterSet):
    ni = django_filters.CharFilter(lookup_expr='icontains')
    sig = django_filters.NumberFilter()
    responsavel = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Ambiente
        fields = ['ni', 'sig', 'responsavel']
