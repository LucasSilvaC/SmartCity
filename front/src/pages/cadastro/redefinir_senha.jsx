import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../../assets/SmartCity_Logo.png";
import BackgroundImage from "/Senai_anime.png";
import LoadingOverlay from "../../componentes/loading/loading_overlay";
import ModalMessage from "../../componentes/modal/successful";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setModal({ show: false, message: "", type: "" });
    if (modal.type === "success") {
      setFadeOut(true);
      setTimeout(() => navigate("/login"), 1200);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setModal({ show: true, message: "As senhas não coincidem!", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/redefinir_senha/", {
        username,
        new_password: newPassword,
      });

      setModal({ show: true, message: "Senha redefinida com sucesso!", type: "success" });
    } catch (error) {
      setModal({
        show: true,
        message: error.response?.data?.erro || "Erro ao redefinir a senha.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {isLoading && <LoadingOverlay />}
      {modal.show && <ModalMessage message={modal.message} type={modal.type} onClose={closeModal} />}

      <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-8 relative">
        <img src={Logo} alt="Logo SmartCity" className="absolute top-6 left-6 w-28 md:w-32 select-none" />
        <div
          className={`transition-opacity duration-700 w-full max-w-md p-10 rounded-2xl bg-black bg-opacity-60 shadow-xl border border-gray-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}
        >
          <h1 className="text-4xl font-extrabold text-white text-center leading-tight">
            Redefinir senha
            <span className="block mt-3 text-green-500">SmartCity</span>
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-10">
            <div>
              <label className="text-white text-lg font-semibold mb-2 block">Nome de usuário</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome de usuário"
                className="w-full h-12 px-4 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-white text-lg font-semibold mb-2 block">Nova senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite a nova senha"
                  className="w-full h-12 px-4 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-400"
                  aria-label="Mostrar/ocultar senha"
                >
                  {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-white text-lg font-semibold mb-2 block">Confirmar nova senha</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme a nova senha"
                className="w-full h-12 px-4 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 transition rounded-lg py-3 text-white font-bold text-xl shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Redefinir senha
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-green-500 hover:text-green-400 hover:underline font-medium">
              Voltar ao login
            </Link>
          </div>
        </div>
      </div>

      <div
        className="w-full md:w-1/2 hidden md:block bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      />
    </div>
  );
}