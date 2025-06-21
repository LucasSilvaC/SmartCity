import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/cadastro/register';
import Home from './pages/home/home';
import Redefinir_senha from './pages/cadastro/redefinir_senha';
import Sensor from './pages/sensores/sensor';
import { FaRegLightbulb } from 'react-icons/fa6';
import { MdCountertops } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';
import { FaThermometerEmpty } from 'react-icons/fa';
import ProtectedRoute from "./componentes/autenticacao/protect";
import Ambientes from "./pages/ambientes/ambientes";
import Historico from "./pages/historico/historico";
import Historico_ambiente from "./pages/historico/historico_ambiente";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/redefinir_senha" element={<Redefinir_senha />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />

          <Route
            path="/sensor_luminosidade"
            element={<Sensor tipoSensor="luminosidade" icon={FaRegLightbulb} endpoint="luminosidade" label="Luminosidade" />}
          />
          <Route
            path="/sensor_contador"
            element={<Sensor tipoSensor="contador" icon={MdCountertops} endpoint="contador" label="Contador" />}
          />
          <Route
            path="/sensor_umidade"
            element={<Sensor tipoSensor="umidade" icon={WiHumidity} endpoint="umidade" label="Umidade" />}
          />
          <Route
            path="/sensor_temperatura"
            element={<Sensor tipoSensor="temperatura" icon={FaThermometerEmpty} endpoint="temperatura" label="Temperatura" />}
          />

          <Route path="/ambientes" element={<Ambientes />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/historico_ambiente" element={<Historico_ambiente />} />
        </Route>
      </Routes>
    </Router>
  );
}