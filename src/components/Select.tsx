type SelectType = {
  options: string[];
  name: string;
  label: string;
};

const Select = ({ options, label, name }: SelectType) => {
  return (
    <label>
      {label}
      <select
        defaultValue={options[0]}
        name={name}
        className="bg-black text-white capitalize ml-3 px-6 py-1"
      >
        {options.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default Select;
