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
    <main className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {isLoading && <LoadingOverlay />}
      {modal.show && (
        <ModalMessage
          message={modal.message}
          type={modal.type}
          onClose={handleCloseModal}
        />
      )}

      <section className="w-full md:w-2/3 flex flex-col items-center justify-center p-8 relative">
        <figure>
          <img
            src={Logo}
            alt="Logo da plataforma SmartCity"
            className="absolute top-6 left-6 w-28 md:w-32 select-none"
          />
          <figcaption className="sr-only">Logotipo do sistema SmartCity no canto superior esquerdo</figcaption>
        </figure>

        <ToolTip message="O login padrão de administrador é User: Lucas Senha: 123">
          <FaInfoCircle className="w-10 md:w-12 text-white text-3xl cursor-pointer absolute top-6 right-6" />
        </ToolTip>

        <article
          className={`transition-opacity duration-700 w-full max-w-md p-10 rounded-2xl bg-black bg-opacity-60 shadow-xl border border-gray-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}
        >
          <header>
            <h1 className="text-4xl font-extrabold text-white text-center leading-tight">
              Insira sua Conta
              <strong className="block mt-3 text-green-500">SmartCity</strong>
            </h1>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-10">
            <section>
              <label htmlFor="username" className="text-white text-lg font-semibold mb-2 block">
                Nome de usuário
              </label>
              <input
                id="username"
                type="text"
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Digite seu nome de usuário"
                className="w-full h-12 px-4 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </section>

            <section>
              <label htmlFor="password" className="text-white text-lg font-semibold mb-2 block">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full h-12 px-4 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-400"
                  aria-label="Mostrar ou ocultar senha"
                >
                  {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                </button>
              </div>
            </section>

            <button
              type="submit"
              className="cursor-pointer w-full bg-[#16A34A] hover:bg-[#126B4B] transition rounded-lg py-3 text-white font-bold text-xl shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Entrar
            </button>
          </form>

          <nav className="mt-8 text-center" aria-label="Links úteis">
            <Link to="/register" className="text-green-500 hover:text-green-400 hover:underline font-medium">
              Não tem uma conta? Cadastre-se
            </Link>
          </nav>

          <nav className="mt-4 text-center" aria-label="Recuperação de senha">
            <Link to="/redefinir_senha" className="text-green-500 hover:text-green-400 hover:underline font-medium">
              Esqueceu a senha?
            </Link>
          </nav>
        </article>

        <figure>
          <img
            src={Senai_Logo}
            alt="Logotipo do Senai"
            className="fixed bottom-6 right-6 w-32 opacity-60 hover:opacity-90 transition-opacity duration-300 z-50 select-none"
          />
          <figcaption className="sr-only">Logo do Senai na parte inferior direita da tela</figcaption>
        </figure>
      </section>

      <aside
        className={`w-full md:w-1/2 hidden md:block bg-cover bg-center transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        aria-label="Imagem decorativa"
      ></aside>
    </main>
  );

}