import React, { useState } from "react";
import axios from "axios";

function ModalEditSensor({ sensor, onClose, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    sensorName: sensor?.sensor || "",
    macAddress: sensor?.mac_address || "",
    unidadeMed: sensor?.unidade_med || "",
    status: sensor?.status ? "Ativo" : "Inativo",
    latitude: sensor?.latitude || "",
    longitude: sensor?.longitude || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    if (!formData.sensorName.trim()) {
      alert("O nome do sensor é obrigatório.");
      return false;
    }

    if (!formData.macAddress.trim()) {
      alert("O MAC Address é obrigatório.");
      return false;
    }

    if (!formData.unidadeMed) {
      alert("Selecione a unidade de medição.");
      return false;
    }

    if (!formData.latitude || isNaN(formData.latitude)) {
      alert("Latitude inválida.");
      return false;
    }

    if (!formData.longitude || isNaN(formData.longitude)) {
      alert("Longitude inválida.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    const sensorPayload = {
      sensor: formData.sensorName,
      mac_address: formData.macAddress,
      unidade_med: formData.unidadeMed,
      status: formData.status === "Ativo",
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
    };

    const token = localStorage.getItem("token");

    try {
      let response;
      if (sensor?.id) {
        response = await axios.put(
          `http://127.0.0.1:8000/api/sensor/${sensor.id}/`,
          sensorPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.post(
          `http://127.0.0.1:8000/api/sensores/`,
          sensorPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      console.log("Resposta da API:", response.data);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar o sensor:", error);
      if (error.response) {
        console.log("Erro de resposta:", error.response.data);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/sensor/${sensor.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Seu sensor foi excluído com sucesso!");

      onDelete(sensor.id);
      onClose();
    } catch (error) {
      console.error("Erro ao excluir o sensor:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-sm shadow-2xl w-[450px] max-w-lg">
        <h2 className="text-3xl text-white font-bold mb-6 text-center">
          Sensor
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="sensorName" className="block text-sm font-medium text-gray-300">
              Nome do Sensor
            </label>
            <input
              type="text"
              id="sensorName"
              name="sensorName"
              value={formData.sensorName}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-600 rounded-sm bg-gray-800 text-white"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="macAddress" className="block text-sm font-medium text-gray-300">
              MAC Address
            </label>
            <input
              type="text"
              id="macAddress"
              name="macAddress"
              value={formData.macAddress}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-600 rounded-sm bg-gray-800 text-white"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="unidadeMed" className="block text-sm font-medium text-gray-300">
              Unidade de Medição
            </label>
            <select
              id="unidadeMed"
              name="unidadeMed"
              value={formData.unidadeMed}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-600 rounded-sm bg-gray-800 text-white"
            >
              <option value="">Selecione...</option>
              <option value="contador">Contador</option>
              <option value="luminosidade">Luminosidade</option>
              <option value="umidade">Umidade</option>
              <option value="temperatura">Temperatura</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-300">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-600 rounded-sm bg-gray-800 text-white"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-300">
              Latitude
            </label>
            <input
              type="number"
              step="0.00001"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-600 rounded-sm bg-gray-800 text-white"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-300">
              Longitude
            </label>
            <input
              type="number"
              step="0.00001"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-600 rounded-sm bg-gray-800 text-white"
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-3 bg-red-400 text-white font-bold hover:bg-red-500 rounded-sm cursor-pointer"
            >
              Excluir
            </button>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-600 rounded-sm text-white hover:bg-gray-500 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 cursor-pointer text-white font-bold bg-[#16A34A] hover:bg-[#126B4B] transition-transform duration-300 hover:scale-105 rounded-sm"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditSensor;