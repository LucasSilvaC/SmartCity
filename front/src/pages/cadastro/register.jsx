import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../../assets/SmartCity_Logo.png";
import BackgroundImage from "/Senai_anime.png";
import LoadingOverlay from "../../componentes/loading/loading_overlay";
import ModalMessage from "../../componentes/modal/successful";
import { FaInfoCircle } from "react-icons/fa";
import ToolTip from "../../componentes/tool/Tip_baloon";

export default function Register() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    } catch {
      setModal({ show: true, message: "Erro ao registrar. Tente outro nome de usuário.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0f1f13]">
      {isLoading && <LoadingOverlay />}
      {modal.show && (
        <ModalMessage
          message={modal.message}
          type={modal.type}
          onClose={closeModal}
        />
      )}

      <div className="w-full md:w-1/2 flex items-center justify-center relative z-10">
        <img
          src={Logo}
          alt="Logo SmartCity"
          className="absolute top-6 left-6 w-24 md:w-28"
        />

        <ToolTip message="Não se esqueça de anotar o seu usuário e senha!">
          <FaInfoCircle
            className="w-10 md:w-12 text-white text-3xl cursor-pointer"
          />
        </ToolTip>

        <div
          className={`transition-opacity duration-700 w-full max-w-[75%] sm:max-w-[70%] md:max-w-[65%] p-6 md:p-10 rounded-xl bg-transparent ${fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center leading-tight">
            Crie uma nova conta
            <span className="block mt-4 text-[#00c476]">SmartCity</span>
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10">
            <div>
              <label className="text-white text-xl font-semibold mb-1 block">
                Nome de usuário
              </label>
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
              <label className="text-white text-xl font-semibold mb-1 block">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full h-[3rem] px-3 py-2 mt-1 rounded bg-white text-gray-600 text-xl focus:ring-2 focus:ring-[#126b4b] outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-[#126b4b]"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <FiEyeOff size={30} /> : <FiEye size={30} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-white text-xl font-semibold mb-1 block">
                Confirmar senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme sua senha"
                  className="w-full h-[3rem] px-3 py-2 mt-1 rounded bg-white text-gray-600 text-xl focus:ring-2 focus:ring-[#126b4b] outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-[#126b4b]"
                  aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showConfirmPassword ? <FiEyeOff size={30} /> : <FiEye size={30} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="glow-hover cursor-pointer mt-2 bg-[#00c476] text-white font-bold py-3 rounded-md text-2xl hover:bg-[#126b4b] transition-transform duration-300 hover:scale-105"
            >
              Registrar
            </button>
          </form>

          <div className="text-center mt-10">
            <Link to="/login" className="mt-6">
              <span className="hover:underline text-[#00c476] hover:text-[#126b4b]">
                Já tem uma conta? Faça login
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="w-full md:w-1/2 hidden md:block bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      ></div>
    </div>
  );
}
