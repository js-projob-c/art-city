import { Input, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";

interface IProps {
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onBlur?: (e: any) => void;
  onChangeValue?: (text: string) => void;
}

const PhoneInput = ({
  value = "",
  disabled = false,
  placeholder = "",
  onBlur = () => {},
  onChangeValue,
}: IProps) => {
  const [district, setDistrict] = useState<any>("+852");
  const [phoneInput, setPhoneInput] = useState(value);

  useEffect(() => {
    onChangeValue && onChangeValue(phoneInput);
  }, [phoneInput]);

  return (
    <Stack>
      <Input
        inputMode="tel"
        disabled={disabled}
        placeholder={placeholder}
        type="text"
        onChange={(e) => setPhoneInput(e.target.value)}
        onBlur={onBlur}
        value={phoneInput}
      />
    </Stack>
  );
};

export default PhoneInput;
