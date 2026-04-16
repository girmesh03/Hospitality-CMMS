import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

/**
 * Shared RHF text-field wrapper.
 *
 * @param {{name: string, control: import("react-hook-form").Control<any>, label: string, rules?: Record<string, unknown>, textFieldProps?: Record<string, unknown>}} props - Component props.
 * @returns {JSX.Element} RHF text field.
 */
export const FormTextField = ({ name, control, label, rules = {}, textFieldProps = {} }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        label={label}
        fullWidth
        error={Boolean(fieldState.error)}
        helperText={fieldState.error?.message || textFieldProps.helperText}
        {...textFieldProps}
      />
    )}
  />
);

export default FormTextField;
