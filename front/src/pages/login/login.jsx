import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../../componentes/login/loginform";
import Logo from "../../assets/SmartCity_Logo.png";
import BackgroundImage from "/Senai_anime.png";

export default function Login() {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/home");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#242424] relative p-6">
        <img
          src={Logo}
          alt="Logo SmartCity"
          className="absolute top-6 left-6 w-24 md:w-28"
        />

        <div
          className={`transition-opacity duration-700 w-full max-w-[85%] sm:max-w-[70%] md:max-w-[75%] p-6 md:p-10 rounded-xl ${fadeOut ? "opacity-0" : "opacity-100"
            }`}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center leading-tight">
            Insira sua Conta
            <span className="block mt-4">SmartCity</span>
          </h1>

          <div className="mt-10">
            <LoginForm onSuccess={handleSuccess} />
          </div>

          <div className="text-center mt-5">
            <Link to="/register" className="mt-6">
              <span className="hover:underline hover:text-[#126b4b]">
                Não tem uma conta? Cadastre-se
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