from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.exceptions import ValidationError

# Usuários
class UserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('O nome de usuário é obrigatório.')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)

class User(AbstractUser):
    objects = UserManager()

    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

# Sensores
class Sensor(models.Model):
    TIPO = [
        ('temperatura', 'Temperatura'),
        ('umidade', 'Umidade'),
        ('luminosidade', 'Luminosidade'),
        ('contador', 'Contador'),
    ]
    
    sensor = models.CharField(max_length=255)
    mac_address = models.CharField(max_length=255)
    unidade_med = models.CharField(max_length=50, choices=TIPO)
    valor = models.CharField(max_length=50, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def clean(self):
        if self.unidade_med == 'temperatura':
            self.valor = 'Celsius'
        elif self.unidade_med == 'luminosidade':
            self.valor = 'lux'
        elif self.unidade_med == 'umidade':
            self.valor = '%'
        elif self.unidade_med == 'contador':
            self.valor = 'num'
        else:
            raise ValidationError("Unidade de medida inválida.")

    def save(self, *args, **kwargs):
        self.clean() 
        super().save(*args, **kwargs)

# Ambientes        
class Ambiente(models.Model):
    sig = models.CharField(max_length=255)
    descricao = models.TextField()
    ni = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=255)

# Histórico
class Historico(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE)
    observacoes = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)