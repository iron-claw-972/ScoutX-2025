import {FormControl, TextField} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export default function CustomInput(props) {

    const small = props.small
    const required = props.required
    const label = props.label
    const helperText = props.helperText || ""
    const type = props.type
    const multiline = props.multiline
    const fullWidth = props.fullWidth
    const value = props.value
    const onChange = props.onChange

    return (
        <Grid2 xs={small ? 6 : 12} sm={fullWidth ? 12 : 6}>
            <FormControl fullWidth>
                <TextField
                    required={required}
                    id={label}
                    type={type}
                    value={value}
                    multiline={multiline}
                    label={label}
                    helperText={helperText}
                    variant={"filled"}
                    onChange={(event) => {
                        onChange(event.target.value)
                    }}
                />
            </FormControl>
        </Grid2>
    );
}