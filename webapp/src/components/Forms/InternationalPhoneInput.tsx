import "react-international-phone/style.css";

import React from "react";
import { PhoneInput, PhoneInputProps } from "react-international-phone";

interface IProps {}

const InternationalPhoneInput: React.FC<PhoneInputProps> = (props) => {
  return <PhoneInput {...props} />;
};

export default InternationalPhoneInput;
