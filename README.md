# 👋 &nbsp;Hi there
# SmartCity
A new way to see your city.

&nbsp;

## 🧰 &nbsp;My toolbox

<img  src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/css3/css3-original.svg" alt="CSS3" width="50" height="50"/>&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" width="50" height="50"/>&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" alt="Django" width="50" height="50"/>&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" alt="Sqlite" width="50" height="50"/>&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" width="50" height="50"/>&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" width="50" height="50"/>

&nbsp;

## 📖 &nbsp;Library

### 🔙 Backend (Django)
- `pip install django`
- `pip install djangorestframework`
- `pip install djangorestframework-simplejwt`
- `pip install django-cors-headers`
- `pip install django-filter`

### 🔜 Frontend (React)
- `npm install react-router-dom`
- `npm install react-icons`
- `npm install lucide-react`
- `npm install axios`
- `npm install react-loading-icons`
- `npm install react-loading-indicators`
- `npm install react-tsparticles`
- `npm install xlsx`
- `npm install leaflet react-leaflet`
- `npm install tailwindcss @tailwindcss/vite`
- `npm install tailwind-merge`

## 🔒 &nbsp;SuperUser

```python
User: Lucas
Password: 123
  ```

## 🐊 &nbsp;Urls for tests

```python
# Autenticação
path('token/', name="Gerar o Token e login"),
path('token/refresh/', name="Dar refresh para atualizar o token"),
path('register/', name="Registrar um usuário"),
path('redefinir_senha/', name="Redefinir a senha do usuário"),

# Sensor
path('sensores/', name="Listar sensores"),
path('sensor/<int:pk>/', name="Ver sensor individualmente"),
path('sensores/upload_xlsx/', name="Importar arquivo xlsx para o banco"),
path('sensores/exportar_xlsx/', name="Exportar arquivo xlsx do banco"),

# Ambiente
path('ambientes/', name="Listar ambientes"),
path('ambiente/<int:pk>/', name="Ver ambiente individualmente"),
path('ambientes/upload_xlsx/', name="Importar arquivo xlsx para o banco"),
path('ambientes/exportar_xlsx/', name="Exportar arquivo xlsx do banco"),

# Histórico
path('historicos/', name="Listar históricos"),
path('historico/<int:pk>/', name="Ver historico individualmente"),
path('historicos/upload_xlsx/', name="Importar arquivo xlsx para o banco"),
path('historicos/exportar_xlsx/', name="Exportar arquivo xlsx do banco"),
  ```

## 🐊 &nbsp;Filters for tests

* Filtrar por nome do sensor:

  ```http
  GET /historicos/?sensor=temperatura
  ```
* Filtrar registros a partir de uma data (timestamp ≥):

  ```http
  GET /historicos/?timestamp_after=2025-06-02T00:00:00Z
  ```
* Filtrar registros até uma data (timestamp ≤):

  ```http
  GET /historicos/?timestamp_before=2025-06-01T23:59:59Z
  ```
* Filtrar por intervalo de valor:

  ```http
  GET /historicos/?valor_min=1&valor_max=35
  ```

### Sensor

* Filtrar por status (`true` ou `false`):

  ```http
  GET /sensores/?status=true
  ```
* Filtrar por unidade de medida (usar uma das opções definidas em `Sensor.TIPO`):

  ```http
  GET /sensores/?unidade_med=luminosidade
  ```

### Ambiente

* Filtrar por NI:

  ```http
  GET /ambientes/?ni=SN75422
  ```
* Filtrar por SIG:

  ```http
  GET /ambientes/?sig=20400001
  ```
* Filtrar por responsável:

  ```http
  GET /ambientes/?responsavel=CESAR
  ```
