import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function SelectTable({
  options,
  selectedOption,
  setSelectedOption,
  tituloInput,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full sm:w-[80%] max-w-[24rem] h-[3rem] bg-gray-800 border-b border-black rounded-lg z-30 transition duration-300 ease-in-out mb-[5%]"
    >
      <label
        htmlFor="tabela"
        className="block text-sm text-white ml-[1.1vw] mt-[0.5vh] font-semibold"
      >
        {tituloInput}
      </label>
      <div
        className="relative cursor-pointer w-full h-[2.5rem] px-[1.5vw] flex items-center justify-between text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm">
          {selectedOption ? selectedOption.label : "Selecione uma opção"}
        </p>
        {isOpen ? (
          <ChevronUp size={20} className="text-white" />
        ) : (
          <ChevronDown size={20} className="text-white" />
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 top-full left-0 w-full bg-white border border-gray-400 shadow-lg rounded-lg max-h-[10rem] overflow-auto mt-2 transition-all duration-300 ease-in-out">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className="px-[1.5vw] py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-300 hover:text-black rounded-md transition duration-200 ease-in-out"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
