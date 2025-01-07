import { Button } from "@mui/material";
import { useState } from "react";

export default function DockButton({ x, y, data, stage }) {
    const [dockState, setDockState] = useState(data.get(stage, "dock"));

    const handleChange = () => {
        let nextState = "No Dock";
        if (dockState === "No Dock") {
            nextState = "Dock";
        } 
        else if (dockState === "Dock") {
            nextState = "Dock and Engaged";
        }
        setDockState(nextState);
        const dockValue = nextState === "No Dock" ? 0 : nextState === "Dock" ? 1 : 2;
        data.setDock(stage, dockValue);
    };

    const getColor = () => {
        return dockState === "No Dock"
            ? "inherit"
            : dockState === "Dock"
            ? "secondary"
            : "primary";
    };

    return (
        <Button
            onClick={handleChange}
            variant="contained"
            color={getColor()}
            sx={{
                position: "absolute",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                top: `${y}%`,
                left: `${x}%`,
                fontSize: ".9rem",
            }}
        >
            {dockState}
        </Button>
    );
}