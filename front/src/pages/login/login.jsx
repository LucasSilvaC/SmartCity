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
import Senai_Logo from "../../assets/Senai_Logo.png";

export default function Login() {
  const [fadeOut, setFadeOut] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/home");
    }, 1600);
  };

  const handleCloseModal = () => {
    setModal({ show: false, message: "", type: "" });
    if (modal.type === "success") handleSuccess();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: user,
        password,
      });
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("user", JSON.stringify({ username: user }));
      setModal({
        show: true,
        message: "Login realizado com sucesso!",
        type: "success",
      });
    } catch {
      setModal({
        show: true,
        message: "Usuário ou senha incorretos!",
        type: "error",
      });
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
          onClose={handleCloseModal}
        />
      )}

      <div className="w-full md:w-1/2 flex items-center justify-center relative p-6">
        <img
          src={Logo}
          alt="Logo SmartCity"
          className="luz absolute top-6 left-6 w-24 md:w-28"
        />

        <ToolTip message="O login padrão de administrador é User: Lucas Senha: 123">
          <FaInfoCircle
            className="w-10 md:w-12 text-white text-3xl cursor-pointer"
          />
        </ToolTip>

        <div
          className={`transition-opacity duration-700 w-full max-w-[75%] sm:max-w-[70%] md:max-w-[65%] p-6 md:p-10 rounded-xl ${fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center leading-tight">
            Insira sua Conta
            <span className="block mt-4 text-[#00c476]">SmartCity</span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 mt-10"
          >
            <div>
              <label className="text-white text-xl font-semibold mb-1 block">
                Nome de usuário
              </label>
              <input
                type="text"
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
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
                >
                  {showPassword ? <FiEyeOff size={30} /> : <FiEye size={30} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="cursor-pointer mt-2 bg-[#00c476] text-white font-bold py-3 rounded-md text-2xl hover:bg-[#126b4b] transition-transform duration-300 hover:scale-105 glow-hover"
            >
              Entrar
            </button>
          </form>

          <div className="text-center mt-10">
            <Link to="/register" className="mt-6">
              <span className="hover:underline text-[#00c476] hover:text-[#126b4b]">
                Não tem uma conta? Cadastre-se
              </span>
            </Link>
          </div>

          <div className="text-center mt-3">
            <Link to="/redefinir_senha" className="mt-6">
              <span className="hover:underline text-[#00c476] hover:text-[#126b4b]">
                Esqueceu a senha?
              </span>
            </Link>
          </div>
        </div>
        <img
          src={Senai_Logo}
          alt="Logo Senai"
          className="fixed bottom-5 right-5 w-33 opacity-60 hover:opacity-80 transition-opacity duration-300 z-50"
        />
      </div>

      <div
        className={`w-full md:w-1/2 hidden md:block bg-cover bg-center ${fadeOut ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      ></div>
    </div>
  );
}