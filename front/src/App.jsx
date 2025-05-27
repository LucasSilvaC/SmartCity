import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/cadastro/register';
import Home from './pages/home/home';
import Redefinir_senha from './pages/cadastro/redefinir_senha';
import Ajuda from "./pages/settings_extension/ajuda";
import Sensor_luminosidade from './pages/sensores/luminosidade/luminosidade';
import Sensor_contador from './pages/sensores/contador/sensor_contador';
import Sensor_umidade from './pages/sensores/umidade/sensor_umidade';
import Sensor_temperatura from './pages/sensores/temperatura/sensor_temperatura';
import ProtectedRoute from "./componentes/autenticacao/protect";
import Ambientes from "./pages/ambientes/ambientes"
import Dashboards from "./pages/dashboards/dashboards"
import Mapa from "./pages/mapa/mapa"
import Historico from "./pages/historico/historico"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/redefinir_senha" element={<Redefinir_senha />} />
        <Route path="/ajuda" element={<Ajuda />} />

        {/* Rotas privadas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/sensor_luminosidade" element={<Sensor_luminosidade />} />
          <Route path="/sensor_contador" element={<Sensor_contador />} />
          <Route path="/sensor_umidade" element={<Sensor_umidade />} />
          <Route path="/sensor_temperatura" element={<Sensor_temperatura />} />
          <Route path="/ambientes" element={<Ambientes />} />
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/historico" element={<Historico />} />
        </Route>
      </Routes>
    </Router>
  );
}
