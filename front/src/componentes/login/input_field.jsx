export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  className = "",
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-") || "input";

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="text-xl">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`w-full px-3 py-2 mt-1 rounded bg-white text-[#242424] focus:ring-2 focus:ring-[#00c476] outline-none ${className}`}
        value={value}
        onChange={onChange}
        aria-label={label || "Campo de entrada"}
        {...props}
      />
    </div>
  );
}