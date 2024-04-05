type TFormInput = {
  title: string;
  field: string;
  type: string;
  name: string;
  min?: number;
  max?: number;
  defaultValue: string | number;
  disabled?: boolean;
};

function FormInput(formInput: TFormInput) {
  const { title, field, type, name, min, max, defaultValue, disabled } =
    formInput ?? {};
  return (
    <div className="flex flex-col py-1">
      <label htmlFor={name} className="text-lg font-semibold mb-1">
        {title || "Title"}
      </label>
      <input
        type={type || "text"}
        id={name || "Name"}
        name={name || "name "}
        min={field === "age" ? min : 0}
        max={field === "age" ? max : 100}
        disabled={disabled || false}
        minLength={type === "phoneNumber" ? 10 : 1}
        maxLength={type === "phoneNumber" ? 10 : 50}
        defaultValue={defaultValue || "Name"}
        className="input-field border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default FormInput;
