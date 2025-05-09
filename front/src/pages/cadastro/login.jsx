import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Bars } from "react-loading-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from '../../assets/logo.png';
import ModalMessage from "../../componentes/modal/successful";

export default function Login() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", type: "" });

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 z-50 flex items-center justify-center">
      <Bars fill="#3cba51" height="90px" />
    </div>
  );

  const closeModal = () => {
    setModal({ show: false, message: "", type: "" });
    if (modal.type === "success") {
      setFadeOut(true);
      setTimeout(() => {
        navigate("/home");
      }, 1200);
    }
  };

  const logar = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: user,
        password: password,
      });

      localStorage.setItem("token", response.data.access);
      localStorage.setItem("user", JSON.stringify({ username: user }));

      setModal({ show: true, message: "Login realizado com sucesso!", type: "success" });
    } catch (error) {
      setModal({ show: true, message: "Usuário ou senha incorretos!", type: "error" });
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
          <h1 className="text-5xl font-bold mb-6 text-center text-white">LOGIN</h1>
          <form onSubmit={logar} className="flex flex-col gap-4">
            <div>
              <label className="text-xl">Nome de usuário:</label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 rounded bg-white text-black focus:ring-2 focus:ring-[#3cba51] outline-none"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xl">Senha:</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 mt-1 rounded bg-white text-black focus:ring-2 focus:ring-[#3cba51] outline-none pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-[#3cba51]"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-[#3cba51] text-white font-semibold py-2 rounded text-xl cursor-pointer 
                         hover:bg-[#2e813c] transform transition duration-600 hover:scale-105"
            >
              Entrar
            </button>
          </form>
          <p className="text-center mt-4 text-[#3cba51] hover:underline hover:text-[#2e813c]">
            <Link to="/register">Não tem uma conta? Cadastre-se</Link>
          </p>
        </section>
      </div>
    </div>
  );
}