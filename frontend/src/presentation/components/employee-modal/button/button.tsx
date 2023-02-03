import React from "react";
import { CustomButton } from "./button-styles";

const Button = ({ Text, onClick, Type = "button", width = "350px" }: any) => {
  return (
    <CustomButton type={Type} onClick={onClick}>
      {Text}
    </CustomButton>
  );
};

export default Button;
