import { Button } from "@mui/material";
import { IntakeElement, IntakeLocations } from "../../../../MatchConstants";

export default function NetButton({
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
                width: "30px",
                height: "137px",
                top: `${y}%`,
                left: `${x}%`,
            }}
            disabled={selectedIntakeElement == 0 || selectedIntakeLocation == 0 || selectedIntakeElement == IntakeElement.CORAL}
        >
        </Button>
    )
}