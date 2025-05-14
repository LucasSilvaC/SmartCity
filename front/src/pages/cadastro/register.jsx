import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Bars } from "react-loading-icons";
import Logo from '../../assets/SmartCity_Logo.png';
import ModalMessage from "../../componentes/modal/successful";

export default function Register() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", type: "" });

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 z-50 flex items-center justify-center">
      <Bars fill="#D8B4FE" height="90px" />
    </div>
  );

  const closeModal = () => {
    setModal({ show: false, message: "", type: "" });
    if (modal.type === "success") {
      setFadeOut(true);
      setTimeout(() => navigate("/login"), 1200);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setModal({ show: true, message: "As senhas não coincidem!", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
      });

      setModal({ show: true, message: "Cadastro realizado com sucesso!", type: "success" });
    } catch (error) {
      setModal({ show: true, message: "Erro ao registrar. Tente outro nome de usuário.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white p-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-[50%] h-[80%] bg-[#3cba51] rounded-br-[100%] z-0"></div>
      <div className="absolute bottom-0 right-0 w-[46%] h-[80%] bg-[#3cba51] rounded-tl-[100%] z-0"></div>
      <img src={Logo} className="absolute top-0 right-0 w-[7%] mt-2 mr-2" />

      {isLoading && <LoadingOverlay />}
      {modal.show && <ModalMessage message={modal.message} type={modal.type} onClose={closeModal} />}

      <div className={`relative z-10 transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
        <section className="bg-transparent p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h1 className="text-5xl font-bold mb-6 text-center text-white">CADASTRO</h1>
          <form onSubmit={registerUser} className="flex flex-col gap-4">
            <div>
              <label className="text-xl">Nome de usuário:</label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 rounded bg-white text-black focus:ring-2 focus:ring-[#3cba51] outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xl">Senha:</label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 rounded bg-white text-black focus:ring-2 focus:ring-[#3cba51] outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xl">Confirmar senha:</label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 rounded bg-white text-black focus:ring-2 focus:ring-[#3cba51] outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-[#3cba51] text-white font-semibold py-2 rounded text-xl cursor-pointer 
                         hover:bg-[#2e813c] transform transition duration-600 hover:scale-105"
            >
              Registrar
            </button>
          </form>
          <p className="text-center mt-4 text-[#3cba51] hover:underline hover:text-[#2e813c]">
            <Link to="/login">Já tem uma conta? Faça login</Link>
          </p>
        </section>
      </div>
    </div>
  );
}