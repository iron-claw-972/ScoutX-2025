import {Box, Button} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function CustomToggleButton(props) {

    const label = props.label
    const onClick = props.onClick
    const value = props.value
    const showCheckbox = props.showCheckbox

    return (
        <Grid2 xs={12} sx={{
            ...props.sx
        }}>
            <Button
                variant={value ? "contained" : "outlined"}
                color={!showCheckbox ? (value ? "primary" : "inherit") : "inherit"}
                onClick={() => {
                    onClick(!value)
                }}
                fullWidth
            >
                {
                    showCheckbox ?
                        (value ?
                            <CheckBoxIcon/> :
                            <CheckBoxOutlineBlankIcon/>)
                        : null

                }
                <Box sx={{
                    mx: 1
                }}/>
                {label}
            </Button>
        </Grid2>
    )

}