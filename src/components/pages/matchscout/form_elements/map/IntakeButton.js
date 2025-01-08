import { Button } from "@mui/material";
import { IntakeElement } from "../../../../MatchConstants";

export default function IntakeButton({
    width, 
    height, 
    element,
    selectedIntakeElement,
    setSelectedIntakeElement,
    selectedIntakeLocation,
    setSelectedIntakeLocation,
}) {
    const label = `${element}`
    return (
        <Button
            onClick={
                () => setSelectedIntakeElement(element == "Coral" ? IntakeElement.CORAL : IntakeElement.ALGAE
            )}
            variant= "outlined"
            color= "white"
            sx={{
                width: `${width}px`,
                height: `${height}px`,
                fontSize: "0.8rem",
            }}
            disabled={selectedIntakeLocation != 0}
        >{"Intake " + label}
        </Button>
    )
}