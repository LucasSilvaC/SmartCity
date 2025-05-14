export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  className = "",
  ...props
}) {
  return (
    <div>
      {label && <label className="text-xl">{label}</label>}
      <input
        type={type}
        className={`w-full px-3 py-2 mt-1 rounded bg-white text-[#242424] focus:ring-2 focus:ring-[#00c476] outline-none ${className}`}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}