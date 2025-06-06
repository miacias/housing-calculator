import {
  NumberInput as MantineNumInput,
  type MantineRadius,
  type MantineSize,
  type DataAttributes,
} from "@mantine/core";
import {
  useState,
  useEffect,
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from "react";

type NumberInputProps = {
  allowDecimal?: boolean;
  allowLeadingZeros?: boolean;
  allowNegative?: boolean;
  allowedDecimalSeparators?: string[];
  clampBehavior?: "none" | "blur" | "strict"; // no restrictions, any values allowed on focus, must be within min/max
  decimalScale?: number;
  decimalSeparator?: string;
  defaultValue?: string | number;
  description?: ReactNode;
  descriptionProps?: Record<string, any>;
  disabled?: boolean;
  error?: ReactNode;
  errorProps?: Record<string, any>;
  fixedDecimalScale?: boolean;
  // handlersRef?: ForwardedRef<NumberInputHandlers> | undefined;
  hideControls?: boolean;
  inputContainer?: (children: ReactNode) => ReactNode;
  inputSize?: string;
  inputWrapperOrder?: ("input" | "label" | "description" | "error")[];
  // isAllowed?: ((values: NumberFormatValues) => boolean);
  label?: ReactNode;
  labelProps?: Record<string, any>;
  leftSection?: ReactNode;
  leftSectionPointerEvents?: CSSProperties["pointerEvents"];
  leftSectionProps?: ComponentPropsWithoutRef<"div">;
  leftSectionWidth?: CSSProperties["width"];
  max?: number;
  min?: number;
  onChange?: (value: string | number) => void;
  onBlurCommit: (value: number | string) => void;
  // onValueChange?: OnValueChange;
  pointer?: boolean;
  prefix?: string;
  radius?: MantineRadius | number;
  required?: boolean;
  rightSection?: ReactNode;
  rightSectionPointerEvents?: CSSProperties["pointerEvents"];
  rightSectionProps?: ComponentPropsWithoutRef<"div">;
  rightSectionWidth?: CSSProperties["width"];
  size?: MantineSize | (string & {});
  startValue?: number;
  step?: number;
  stepHoldDelay?: number;
  stepHoldInterval?: number | ((stepCount: number) => number);
  suffix?: string;
  thousandSeparator?: string | boolean;
  thousandsGroupStyle?: "none" | "thousand" | "lakh" | "wan";
  trimLeadingZeroesOnBlur?: boolean;
  type?: "text" | "tel" | "password";
  value?: string | number;
  valueIsNumericString?: boolean;
  withAsterisk?: boolean;
  withErrorStyles?: boolean;
  withKeyboardEvents?: boolean;
  wrapperProps?: Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "ref"
  > &
  DataAttributes;
};

export const NumberInput = ({
  value,
  onBlurCommit,
  ...props
}: NumberInputProps): ReactElement => {
  const [localValue, setLocalValue] = useState<string | number | undefined>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <MantineNumInput {...props}
      value={localValue}
      onChange={setLocalValue}
      onBlur={() => onBlurCommit(localValue ?? 0)}
    />
  );
};
