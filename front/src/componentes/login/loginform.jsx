import { useState } from "react";
import axios from "axios";
import InputField from "./input_field";
import PasswordInput from "./password_input";
import LoadingOverlay from "./loading_overlay";
import ModalMessage from "../modal/successful";

export default function LoginForm({ onSuccess }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState({ show: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setModal({ show: false, message: "", type: "" });
    if (modal.type === "success") onSuccess?.();
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
      setModal({ show: true, message: "Login realizado com sucesso!", type: "success" });
    } catch {
      setModal({ show: true, message: "Usuário ou senha incorretos!", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}

      {modal.show && (
        <ModalMessage
          message={modal.message}
          type={modal.type}
          onClose={handleCloseModal}
        />
      )}

      <main>
        <section aria-label="Formulário de login" className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="username"
                className="text-gray-700 text-sm font-semibold mb-1 block"
              >
                Nome de usuário
              </label>
              <InputField
                id="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                placeholder="Digite seu usuário"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-gray-700 text-sm font-semibold mb-1 block"
              >
                Senha
              </label>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer mt-2 bg-[#00c476] text-white font-bold py-3 rounded-xl text-lg hover:bg-[#126b4b] transition-transform duration-300 hover:scale-105"
            >
              Entrar
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
