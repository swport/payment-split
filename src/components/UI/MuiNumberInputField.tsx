import React from "react";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material/TextField";

type IProps = TextFieldProps & {
    value: number | undefined | null;
};

type Ref = React.RefObject<HTMLInputElement>;

const MuiNumberInputField = React.forwardRef<Ref, IProps>((props, ref) => (
    <TextField
        autoComplete="false"
        autoCapitalize="false"
        autoCorrect="false"
        inputRef={ref}
        size="small"
        type="number"
        inputProps={{
            step: "any",
        }}
        {...props}
        value={props.value ? (props.value <= 0 ? "" : props.value) : ""}
    />
));

export default MuiNumberInputField;
