import { Button } from "@mui/material";
import { IntakeLocations } from "../../../../MatchConstants";

export default function ProcessorButton({
    x, 
    y, 
    selectedIntakeElement, 
    setSelectedIntakeElement, 
    selectedIntakeLocation, 
    setSelectedIntakeLocation,
    startStopwatch,
    stopStopwatch,
    timeElapsed 
}) {
    return (
        <Button
            onClick={() => {
                setSelectedIntakeElement(0);
                setSelectedIntakeLocation(0);
                stopStopwatch();
            }}
            variant={"outlined"}
            color={"inherit"}
            sx={{
                position: "absolute",
                width: "60px",
                height: "40px",
                top: `${y}%`,
                left: `${x}%`,
            }}
            disabled={selectedIntakeElement == 0 || selectedIntakeLocation == 0}
        >
        </Button>
    )
}