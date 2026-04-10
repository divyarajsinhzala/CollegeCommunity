function InputField({ type, placeholder, name, value, onChange }) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full p-3 rounded-xl bg-white border border-[#ead7c9] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm shadow-sm"
    />
  );
}

export default InputField;