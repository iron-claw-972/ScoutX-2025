import { Button } from "@mui/material";
import { IntakeElement, IntakeLocations} from "../../../../MatchConstants";

export default function ReefButton({ 
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
    const isSelected = selectedIntakeLocation == IntakeLocations.REEF;

    return (
        <Button
            onClick={() => {
                setSelectedIntakeLocation(IntakeLocations.REEF);
                startStopwatch();
            }}
            variant={"outlined"}
            color={isSelected ? "primary" : "inherit"}
            sx={{
                position: "absolute",
                width: "100px",
                height: "100px",
                top: `${y}%`,
                left: `${x}%`,
                borderRadius: "50%",
            }}
            disabled={selectedIntakeElement == 0 || selectedIntakeElement == IntakeElement.CORAL || selectedIntakeLocation != 0}
        >
        </Button>
    );
}
