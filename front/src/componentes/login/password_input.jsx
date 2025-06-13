import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

export default function PasswordInput({ value, onChange, id = "password", placeholder = "Digite sua senha", ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="text-xl block mb-1">
        Senha:
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          className="w-full px-3 py-2 mt-1 rounded bg-white text-black focus:ring-2 focus:ring-[#00c476] outline-none pr-10"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label="Senha"
          required
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
          className="absolute right-3 top-3 cursor-pointer text-[#00c476] active:text-[#126b4b]"
        >
          {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>
    </div>
  );
}