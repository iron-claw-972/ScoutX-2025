import { Button } from "@mui/material";

export default function GroundButton({ x, y, setSelectedRow, selectedRow }) {
    const isSelected = selectedRow === 5;

    return (
        <Button
            onClick={() => setSelectedRow(5)}
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
            Ground
        </Button>
    );
}
