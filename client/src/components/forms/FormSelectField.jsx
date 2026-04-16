import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

/**
 * Shared RHF select-field wrapper.
 *
 * @param {{name: string, control: import("react-hook-form").Control<any>, label: string, options: Array<{label: string, value: string}>, rules?: Record<string, unknown>, textFieldProps?: Record<string, unknown>}} props - Component props.
 * @returns {JSX.Element} RHF select field.
 */
export const FormSelectField = ({ name, control, label, options, rules = {}, textFieldProps = {} }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        select
        label={label}
        fullWidth
        error={Boolean(fieldState.error)}
        helperText={fieldState.error?.message || textFieldProps.helperText}
        {...textFieldProps}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);

export default FormSelectField;
