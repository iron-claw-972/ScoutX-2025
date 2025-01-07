import {IconButton, Stack, TextField} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function SmallNumberCounter(props) {

    const label = props.label
    const helperText = props.helperText || ""
    const value = props.value
    const onChange = props.onChange

    const max = props.max || 99999

    return (
        <Grid2 xs={12} sm={6}>
            <Stack direction={"row"} spacing={1}>
                <IconButton
                    onClick={() => {
                        if (value === 0) return
                        if (value >= max) return
                        onChange(value - 1)
                    }}
                >
                    <RemoveIcon/>
                </IconButton>
                <TextField
                    required
                    id={label}
                    type={"number"}
                    value={value}
                    label={label}
                    helperText={helperText}
                    variant={"filled"}
                    fullWidth
                    onChange={(event) => {
                        onChange(event.target.value)
                    }}
                />
                <IconButton
                    onClick={() => {
                        onChange(value + 1)
                    }}
                >
                    <AddIcon/>
                </IconButton>
            </Stack>
        </Grid2>
    );
}