import { IconButton, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function IncrementCounter({value, onChange, selectedRow, setSelectedRow }) {

    return (
        <Grid2 xs={12} sm={6}>
            <Stack direction={"row"} spacing={1} alignItems="center">
                <div style={{ width: '48px', visibility: value > 0 ? 'visible' : 'hidden' }}>
                    <IconButton
                        sx={{ height: '75px' }}
                        onClick={() => {
                            onChange(value - 1);
                        }}
                    >
                        <RemoveIcon />
                    </IconButton>
                </div>
                <Stack 
                    direction={"column"}
                    sx={{
                        backgroundColor: '#666666',
                        width: '150px',
                        height: '75px',
                        padding: 2,
                        borderRadius: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="h4">{value}</Typography>
                </Stack>
                <div style={{ width: '48px', visibility: selectedRow > 0 ? 'visible' : 'hidden' }}>
                    <IconButton
                        sx={{ height: '75px' }}
                        onClick={() => {
                            onChange(value + 1);
                            // {setSelectedRow(0)}; 
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </div>
            </Stack>
        </Grid2>
    );
}
