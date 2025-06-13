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
    <main className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {isLoading && <LoadingOverlay />}
      {modal.show && <ModalMessage message={modal.message} type={modal.type} onClose={closeModal} />}

      <section className="w-full md:w-2/3 flex flex-col items-center justify-center p-8 relative">
        <figure className="absolute top-6 left-6 w-28 md:w-32 select-none">
          <img src={Logo} alt="Logotipo da plataforma SmartCity" className="w-full h-auto" />
          <figcaption className="sr-only">Logo da SmartCity</figcaption>
        </figure>

        <article
          className={`transition-opacity duration-700 w-full max-w-md p-10 rounded-2xl bg-black bg-opacity-60 shadow-xl border border-gray-700 ${fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          <header>
            <h1 className="text-4xl font-extrabold text-white text-center leading-tight">
              Redefinir senha
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome de usuário"
                className="w-full h-12 px-4 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Nome de usuário"
              />
            </section>

            <section>
              <label htmlFor="new-password" className="text-white text-lg font-semibold mb-2 block">
                Nova senha
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite a nova senha"
                  className="w-full h-12 px-4 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 pr-12"
                  aria-label="Nova senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-400"
                  aria-label={showPassword ? "Ocultar nova senha" : "Mostrar nova senha"}
                >
                  {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                </button>
              </div>
            </section>

            <section>
              <label htmlFor="confirm-password" className="text-white text-lg font-semibold mb-2 block">
                Confirmar nova senha
              </label>
              <input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme a nova senha"
                className="w-full h-12 px-4 rounded-lg bg-gray-800 text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Confirmar nova senha"
              />
            </section>

            <button
              type="submit"
              className="cursor-pointer w-full bg-green-600 hover:bg-green-700 transition rounded-lg py-3 text-white font-bold text-xl shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Redefinir senha
            </button>
          </form>

          <footer className="mt-8 text-center">
            <Link to="/login" className="text-green-500 hover:text-green-400 hover:underline font-medium">
              Voltar ao login
            </Link>
          </footer>
        </article>
      </section>

      <aside
        className="w-full md:w-1/2 hidden md:block bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        aria-label="Imagem de fundo ilustrativa"
      />
    </main>
  );
}