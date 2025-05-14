import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

export default function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="text-xl">Senha:</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          className="w-full px-3 py-2 mt-1 rounded bg-white text-black focus:ring-2 focus:ring-[#00c476] outline-none pr-10"
          value={value}
          onChange={onChange}
          required
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-3 cursor-pointer text-[#00c476] active:text-[#126b4b]"
        >
          {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>
    </div>
  );
}
