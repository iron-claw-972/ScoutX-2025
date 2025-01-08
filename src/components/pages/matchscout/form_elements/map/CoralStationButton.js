import { Button } from "@mui/material";
import { IntakeElement, IntakeLocations } from "../../../../MatchConstants";

export default function CoralStationButton({
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
    const isSelected = selectedIntakeLocation == IntakeLocations.STATION;
    return (
        <Button
            onClick={() => {
                setSelectedIntakeLocation(IntakeLocations.STATION);
                startStopwatch();
            }}
            variant={"outlined"}
            color={isSelected ? "primary" : "inherit"}
            sx={{
                position: "absolute",
                width: "60px",
                height: "60px",
                top: `${y}%`,
                left: `${x}%`,
            }}
            disabled={selectedIntakeElement == 0 || selectedIntakeElement == IntakeElement.ALGAE}
        >
        </Button>
    )
}