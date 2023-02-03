import { InputField } from "./input-styles";

const Input = ({ type, placeholder, value, onChange }: any) => {
  return (
    <InputField
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
