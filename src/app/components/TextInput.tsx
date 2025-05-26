import {
  TextInput as MantineTextInput,
  type MantineRadius,
  type MantineSize,
  type DataAttributes,
} from "@mantine/core";
import {
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from "react";

type TextInputProps = {
  description?: ReactNode;
  descriptionProps?: Record<string, any>;
  disabled?: boolean;
  error?: ReactNode;
  errorProps?: Record<string, any>;
  inputContainer?: (children: ReactNode) => ReactNode;
  inputSize?: string;
  inputWrapperOrder?: ("input" | "label" | "description" | "error")[];
  label?: ReactNode;
  labelProps?: Record<string, any>;
  leftSection?: ReactNode;
  leftSectionPointerEvents?: CSSProperties["pointerEvents"];
  leftSectionProps?: ComponentPropsWithoutRef<"div">;
  leftSectionWidth?: CSSProperties["width"];
  pointer?: boolean;
  radius?: MantineRadius | number;
  required?: boolean;
  rightSection?: ReactNode;
  rightSectionPointerEvents?: CSSProperties["pointerEvents"];
  rightSectionProps?: ComponentPropsWithoutRef<"div">;
  rightSectionWidth?: CSSProperties["width"];
  size?: MantineSize | (string & {});
  withAsterisk?: boolean;
  withErrorStyles?: boolean;
  wrapperProps?: Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "ref"
  > &
    DataAttributes;

  // Native input props
  type?: "text" | "email" | "password" | "url" | "tel" | "search";
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
};

export const TextInput = (props: TextInputProps): ReactElement => {
  return <MantineTextInput {...props} />;
};
