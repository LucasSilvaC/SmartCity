import React, { useState } from "react";
import axios from "axios";

export default function ModalEditAmbiente({ ambiente, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    sig: ambiente?.sig || "",
    descricao: ambiente?.descricao || "",
    ni: ambiente?.ni || "",
    responsavel: ambiente?.responsavel || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      sig: formData.sig,
      descricao: formData.descricao,
      ni: formData.ni,
      responsavel: formData.responsavel,
    };

    const token = localStorage.getItem("token");

    try {
      let response;
      if (ambiente?.id) {
        response = await axios.put(`http://127.0.0.1:8000/api/ambiente/${ambiente.id}/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        response = await axios.post(`http://127.0.0.1:8000/api/ambientes/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar ambiente:", error);
      if (error.response) console.log(error.response.data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-sm shadow-2xl w-[450px] max-w-lg">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">
          {ambiente?.id ? "Editar Ambiente" : "Adicionar Ambiente"}
        </h2>
        <form onSubmit={handleSubmit}>
          {["sig", "descricao", "ni", "responsavel"].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-medium text-gray-300 capitalize" htmlFor={field}>
                {field}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-600 rounded-sm bg-gray-800 text-white"
              />
            </div>
          ))}

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="px-6 py-3 bg-gray-600 rounded-sm text-white hover:bg-gray-500 cursor-pointer">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-3 bg-[#16A34A] hover:bg-[#126B4B] text-white font-bold rounded-sm">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}