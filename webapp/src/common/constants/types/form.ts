import { RegisterOptions, UseFormWatch } from "react-hook-form";

interface FormConfigBasic {
  component:
    | "input"
    | "input_phone"
    | "text_area"
    | "select"
    | "select_multiple"
    | "checkbox"
    | "custom"
    | "link";
  customKey?: string;
  textAreaHeight?: number | string;
  label: string;
  name: string;
  defaultValue: any;
  placeholder: string;
  type: "text" | "password" | "number" | "date";
  description: string;
  displayIfMatch?: (watch: UseFormWatch<any>) => boolean;
  disabled: boolean;
  options?: Record<string, any>[];
  props?: Record<string, any>;
  transform?: (value: any) => any;
  noEdit?: boolean;
  link?: (value: any) => string;
}

export type FormConfigProps = Partial<FormConfigBasic> & {
  config?: RegisterOptions;
};
