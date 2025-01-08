import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import {Button} from "@mui/material";

export default function ReefOuttakeTable({
    selectedIntakeElement, 
    setSelectedIntakeElement, 
    setSelectedIntakeLocation,
    selectedIntakeLocation, 
    x, 
    y,
    startStopwatch,
    stopStopwatch,
    timeElapsed 
}) {

    const buttonHeight = "56.5px";

    return (
        <Grid
            sx={{
                top: `${y}%`,
                left: `${x}%`,
                position: "absolute",
                width: "155px"
            }}
        >
            <Stack direction={"column"} spacing={"5px"}>
                <Button
                    onClick={()=> {
                        setSelectedIntakeElement(0);
                        setSelectedIntakeLocation(0);
                        stopStopwatch();
                    }}
                    variant= "outlined"
                    color= "white"
                    maxwidth
                    sx={{
                        height: buttonHeight,
                        fontSize: "1.0rem",
                    }}
                >
                L4
                </Button>

                <Button
                    onClick={()=> {
                        setSelectedIntakeElement(0);
                        setSelectedIntakeLocation(0);
                        stopStopwatch();
                    }}
                    variant= "outlined"
                    color= "white"
                    maxwidth
                    sx={{
                        height: buttonHeight,
                        fontSize: "1.0rem",
                    }}
                >
                L3
                </Button>

                <Button
                    onClick={()=> {
                        setSelectedIntakeElement(0);
                        setSelectedIntakeLocation(0);
                        stopStopwatch();
                    }}
                    variant= "outlined"
                    color= "white"
                    maxwidth
                    sx={{
                        height: buttonHeight,
                        fontSize: "1.0rem",
                    }}
                >
                L2
                </Button>

                <Button
                    onClick={()=> {
                        setSelectedIntakeElement(0);
                        setSelectedIntakeLocation(0);
                        stopStopwatch();
                    }}
                    variant= "outlined"
                    color= "white"
                    maxwidth
                    sx={{
                        height: buttonHeight,
                        fontSize: "1.0rem",
                    }}
                >
                Trough
                </Button>
            </Stack>
        </Grid>
    );
}