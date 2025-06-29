import { Atom } from "react-loading-indicators";

export default function LoadingOverlay() {
  return (
    <div
      role="status"
      aria-label="Carregando conteúdo"
      className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-60 z-50 flex items-center justify-center"
    >
      <Atom color="#00c476" size="medium" />
      <span className="sr-only">Carregando...</span>
    </div>
  );
}