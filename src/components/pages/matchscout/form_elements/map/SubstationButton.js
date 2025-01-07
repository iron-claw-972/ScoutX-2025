import { Button } from "@mui/material";

export default function SubstationButton({ x, y, setSelectedRow, selectedRow }) {
    const isSelected = selectedRow === 6;

    return (
        <Button
            onClick={() => setSelectedRow(6)}
            variant={isSelected ? "contained" : "outlined"}
            color={isSelected ? "primary" : "inherit"}
            sx={{
                position: "absolute",
                width: "200px",
                height: "180px",
                fontSize: "1.8rem",
                top: `${y}%`,
                left: `${x}%`,
            }}
        >
            Substation
        </Button>
    );
}
