import keyboard from "../../../public/keyboard.gif";

export default function Alert({ message, type, onClose }) {
  const borderColor = type === "success" ? "border-green-500" : "border-green-700";
  const bgGradient = "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-opacity-90";
  const textColor = "text-white";

  return (
    <div
      className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
      role="presentation"
      aria-hidden="false"
    >
      <section
        className={`w-full max-w-sm sm:max-w-md rounded-2xl shadow-2xl border-4 ${borderColor} p-6 sm:p-8 flex flex-col items-center text-center ${bgGradient}`}
        role="alertdialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <h2
          id="modal-title"
          className={`text-2xl sm:text-3xl font-bold mb-4 ${textColor}`}
        >
          Atenção
        </h2>

        <p
          id="modal-description"
          className={`text-base sm:text-lg ${textColor} mb-4`}
        >
          {message}
        </p>

        <img
          src={keyboard}
          alt="Animação de um teclado digitando"
          className="w-32 sm:w-40 h-auto mb-6"
        />

        <button
          onClick={onClose}
          className="w-full sm:w-4/5 h-11 rounded-lg border-2 border-green-600 bg-transparent text-white font-semibold hover:bg-green-600 hover:shadow-lg transition duration-300 cursor-pointer"
          aria-label="Fechar modal"
        >
          OK
        </button>
      </section>
    </div>
  );
}