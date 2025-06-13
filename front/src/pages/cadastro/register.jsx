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
    <main className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {isLoading && <LoadingOverlay />}
      {modal.show && (
        <ModalMessage
          message={modal.message}
          type={modal.type}
          onClose={closeModal}
        />
      )}

      <section className="w-full md:w-2/3 flex flex-col items-center justify-center p-8 relative">
        <figure className="absolute top-6 left-6 w-28 md:w-32 select-none">
          <img
            src={Logo}
            alt="Logotipo da plataforma SmartCity"
            className="w-full h-auto"
          />
          <figcaption className="sr-only">Logo da SmartCity</figcaption>
        </figure>

        <ToolTip message="Não se esqueça de anotar o seu usuário e senha!">
          <FaInfoCircle
            className="w-10 md:w-12 text-white text-3xl cursor-pointer absolute top-6 right-6"
            aria-hidden="true"
          />
        </ToolTip>

        <article
          className={`transition-opacity duration-700 w-full max-w-md p-10 rounded-2xl bg-black bg-opacity-60 shadow-xl border border-gray-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}
        >
          <header>
            <h1 className="text-4xl font-extrabold text-white text-center leading-tight">
              Crie uma nova conta
              <strong className="block mt-3 text-green-500">SmartCity</strong>
            </h1>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-10">
            <section>
              <label className="text-white text-lg font-semibold mb-2 block">
                Nome de usuário
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome de usuário"
                className="w-full h-12 px-4 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Nome de usuário"
              />
            </section>

            <section>
              <label className="text-white text-lg font-semibold mb-2 block">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full h-12 px-4 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                  aria-label="Senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-400"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                </button>
              </div>
            </section>

            <section>
              <label className="text-white text-lg font-semibold mb-2 block">
                Confirmar senha
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme sua senha"
                  className="w-full h-12 px-4 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                  aria-label="Confirmar senha"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-400"
                  aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                >
                  {showConfirmPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                </button>
              </div>
            </section>

            <button
              type="submit"
              className="cursor-pointer w-full bg-green-600 hover:bg-green-700 transition rounded-lg py-3 text-white font-bold text-xl shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Registrar
            </button>
          </form>

          <footer className="mt-8 text-center">
            <Link to="/login" className="text-green-500 hover:text-green-400 hover:underline font-medium">
              Já tem uma conta? Faça login
            </Link>
          </footer>
        </article>
      </section>

      <aside
        className="w-full md:w-1/2 hidden md:block bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        aria-label="Imagem de fundo com paisagem urbana futurista"
      />
    </main>
  );
}