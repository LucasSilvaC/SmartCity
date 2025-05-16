// imports iguais ao Register.jsx
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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0f1f13]">
      {isLoading && <LoadingOverlay />}
      {modal.show && <ModalMessage message={modal.message} type={modal.type} onClose={closeModal} />}

      <div className="w-full md:w-1/2 flex items-center justify-center relative z-10">
        <img src={Logo} alt="Logo SmartCity" className="absolute top-6 left-6 w-24 md:w-28" />
        <div className={`transition-opacity duration-700 w-full max-w-[75%] md:max-w-[65%] p-6 md:p-10 rounded-xl bg-transparent ${fadeOut ? "opacity-0" : "opacity-100"}`}>
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center leading-tight">
            Redefinir senha
            <span className="block mt-4 text-[#00c476]">SmartCity</span>
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10">
            <div>
              <label className="text-white text-xl font-semibold mb-1 block">Nome de usuário</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome de usuário"
                className="w-full h-[3rem] px-3 py-2 mt-1 rounded bg-white text-gray-600 text-xl focus:ring-2 focus:ring-[#126b4b] outline-none"
              />
            </div>

            <div>
              <label className="text-white text-xl font-semibold mb-1 block">Nova senha</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite a nova senha"
                  className="w-full h-[3rem] px-3 py-2 mt-1 rounded bg-white text-gray-600 text-xl focus:ring-2 focus:ring-[#126b4b] outline-none pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[#126b4b]">
                  {showPassword ? <FiEyeOff size={30} /> : <FiEye size={30} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-white text-xl font-semibold mb-1 block">Confirmar nova senha</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme a nova senha"
                className="w-full h-[3rem] px-3 py-2 mt-1 rounded bg-white text-gray-600 text-xl focus:ring-2 focus:ring-[#126b4b] outline-none"
              />
            </div>

            <button type="submit" className="glow-hover cursor-pointer mt-2 bg-[#00c476] text-white font-bold py-3 rounded-md text-2xl hover:bg-[#126b4b] transition-transform duration-300 hover:scale-105">
              Redefinir senha
            </button>
          </form>

          <div className="text-center mt-10">
            <Link to="/login">
              <span className="hover:underline text-[#00c476] hover:text-[#126b4b]">Voltar ao login</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 hidden md:block bg-cover bg-center" style={{ backgroundImage: `url(${BackgroundImage})` }} />
    </div>
  );
}
