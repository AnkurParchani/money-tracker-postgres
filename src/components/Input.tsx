type InputProps = {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
};

const Input = ({ type, name, label, required, defaultValue }: InputProps) => {
  return (
    <label className="text-gray-300">
      {label}
      <input
        type={type}
        defaultValue={defaultValue}
        name={name}
        min="0"
        required={required}
        className="bg-black text-white ml-3 px-2 py-1"
      />
    </label>
  );
};

export default Input;
