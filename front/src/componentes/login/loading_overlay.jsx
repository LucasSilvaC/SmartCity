import { Bars } from "react-loading-icons";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-60 z-50 flex items-center justify-center">
      <Bars fill="#00c476" height="90px" />
    </div>
  );
}