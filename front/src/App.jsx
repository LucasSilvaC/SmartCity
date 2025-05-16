import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/cadastro/register';
import Home from './pages/home/home';
import Redefinir_senha from './pages/cadastro/redefinir_senha';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/redefinir_senha" element={<Redefinir_senha />} />
      </Routes>
    </Router>
  );
}