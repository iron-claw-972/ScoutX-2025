import { Grid, Button, Box, Typography } from "@mui/material";
import IntakeButton from "./IntakeButton";
import { Stack } from "@mui/system";
import CustomToggleButton from "../CustomToggleButton";
import {useCookies} from "react-cookie";
import { IntakeElement, IntakeLocations, MatchStage } from "../../../../MatchConstants";
import { Constants } from "../../../../../Constants";

export default function IntakeTable ({
    sx,
    update,
    stage,
    data,
    selectedIntakeElement,
    setSelectedIntakeElement,
    selectedIntakeLocation,
    setSelectedIntakeLocation,
    handleStageChange,
    formatTime,
    elapsedTime,
    isRunning,
    startStopwatch,
    stopStopwatch,
    setElapsedTime,
    boxDimensions
}) {

    const [cookies, setCookie] = useCookies(); 

    return (
        
        <Grid
        container
        sx={{
            position: 'absolute',
            ...sx,
        }}
        >
            <Stack direction={'column'} spacing={'15px'}>

                <Stack direction={'row'} spacing={'5px'}>

                <Typography 
                    variant="h6" 
                    style={{
                    fontSize: '18px', 
                    color: 'white', 
                    margin: '-40px', 
                    position: 'relative', 
                    top: '-2px', 
                    left: '165%', 
                    }}
                >
                {"⏰: " + formatTime(elapsedTime)}
                </Typography>


                 <Box
                        draggable={"false"}
                        component={"img"}
                        src={Constants.coralGamepiece}
                        sx={{
                            position: "absolute",
                            width: "30px",
                            height: "40px",
                            top: "32%",
                            left: "10%",
                            pointerEvents: "none", // Ensure the image does not interact with button methods
                        }}
                    />
                    <Box
                        draggable={"false"}
                        component={"img"}
                        src={Constants.algaeGamepiece}
                        sx={{
                            position: "absolute",
                            width: "40px",
                            height: "40px",
                            top: "32%",
                            left: "32%",
                            pointerEvents: "none", // Ensure the image does not interact with button methods
                        }}
                    />

                    <IntakeButton 
                        width={(40 / 100) * boxDimensions.height} 
                        height={(47.3 / 100) * boxDimensions.height} 
                        element={"Coral"}
                        selectedIntakeElement={selectedIntakeElement}
                        setSelectedIntakeElement={setSelectedIntakeElement}
                        selectedIntakeLocation={selectedIntakeLocation}
                        setSelectedIntakeLocation={setSelectedIntakeLocation}
                    />
                    <IntakeButton 
                        width={(40 / 100) * boxDimensions.height} 
                        height={(47.3 / 100) * boxDimensions.height} 
                        element={"Algae"}
                        selectedIntakeElement={selectedIntakeElement}
                        setSelectedIntakeElement={setSelectedIntakeElement}
                        selectedIntakeLocation={selectedIntakeLocation}
                        setSelectedIntakeLocation={setSelectedIntakeLocation}
                    />
                    
                </Stack>

                <Stack direction={"row"} spacing={"-10%"} justifyContent={"space-between"} alignItems={"center"}>
                    <Button
                        variant={"outlined"}
                        color="error"
                        onClick={() => {
                            setSelectedIntakeElement(0);
                            setSelectedIntakeLocation(0);
                            stopStopwatch();
                            setElapsedTime(0);
                        }}
                        sx={{
                            height: "105%",
                            width: "35%",
                        }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'error', }}>
                    Cancel
                    </Typography> </Button>
                    
                <Button
                variant={"outlined"}
                color="error"
                onClick={() => {
                    data.deletePrevious(stage);
                 update();}}
                 sx={{
                   height: "105%",
                   width: "34%",
                    }}>
                        <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                            Delete Previous
                            </Typography> </Button>


                    <Typography 
                    variant="h7"
                    style={{
                    fontSize: '15px', 
                    color: 'white', 
                    margin: '-8%', 
                    position: 'relative',  
                    left: '-11%', 
                    }}
                    >
                        {data.getOuttakeCount(stage)}
                    </Typography>
                    

                <Button
                variant="outlined"
                onClick={() => {
                setCookie('flipMap', !cookies.flipMap);
                update();
                }}
                sx={{
                height: "105%",
                width: "20%",
                mx: 1,
                color: cookies.flipMap ? "lightBlue" : "pink", 
                
                borderColor: cookies.flipMap ? "lightBlue" : "pink", 
                
                }}      
>
    
                {cookies.flipMap ? "Flip" : "Flip"}
                </Button>

                </Stack>


                    <Stack
                        direction={"row"}
                        spacing={2}
                        sx={{
                            my: 2,
                        }}
                    >
                    {data.stage !== MatchStage.PRE_MATCH && (
                        <Button
                            fullWidth
                            variant={"outlined"}
                            onClick={() => {
                                handleStageChange(data.stage - 1);
                                update();
                                setSelectedIntakeElement(0);
                                setSelectedIntakeLocation(0);
                            }}
                        >
                            Previous
                        </Button>
                    )}
                    {data.stage !== MatchStage.POST_MATCH && (
                        <Button
                            fullWidth
                            variant={"outlined"}
                            onClick={() => {
                                handleStageChange(data.stage + 1);
                                update();
                                setSelectedIntakeElement(IntakeElement.CORAL);
                                setSelectedIntakeLocation(IntakeLocations.PRELOAD);
                            }}
                        >
                            Next
                        </Button>
                    )}
                    
                    {data.stage === MatchStage.POST_MATCH && (
                        <Button
                            fullWidth
                            color={"success"}
                            variant={"outlined"}
                            onClick={() => {
                                data.submit();
                                update();
                            }}
                        >
                            Submit
                        </Button>
                    )}
                </Stack>
                </Stack>
                
        </Grid>
    )
}