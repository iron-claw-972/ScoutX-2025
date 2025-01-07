import { Button } from "@mui/material";

export default function IntakeButton({label, width, height, x, y, element}) {
    return (
        <Button 
            onClick={() => setSelectedRow(rowNumber)}
            variant= "outlined"
            color= "white"
            sx={{
                position: "absolute",
                width: `${width}px`,
                height: `${height}px`,
                fontSize: "1.2rem",
                top: `${y}%`,
                left: `${x}%`,
            }}>{label}
        </Button>
    )
}