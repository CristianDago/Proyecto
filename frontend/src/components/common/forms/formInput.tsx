import { FormInputProps } from "../../../interface/common/inputField";

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  name,
  type,
  value,
  onChange,
  required,
  options,
  accept,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange(e);
  };

  return (
    <div>
      <label htmlFor={id || name}>{label}</label>
      {type === "select" && options ? (
        <select
          id={id || name}
          name={name}
          value={value ?? ""} // ⬅️ Aquí aseguramos que el value nunca sea null o undefined
          onChange={handleChange}
          required={required}
        >
          <option value="">Seleccione una opción</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id || name}
          type={type}
          name={name}
          value={type !== "file" ? value : undefined}
          onChange={handleChange}
          required={required}
          accept={accept}
        />
      )}
    </div>
  );
};

export default FormInput;
