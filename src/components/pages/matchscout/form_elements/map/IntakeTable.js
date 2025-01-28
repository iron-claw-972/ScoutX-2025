import { Grid, Button, Box, Typography } from "@mui/material";
import IntakeButton from "./IntakeButton";
import { Stack } from "@mui/system";
import CustomToggleButton from "../CustomToggleButton";
import {useCookies} from "react-cookie";
import { IntakeElement, IntakeLocations, MatchStage } from "../../../../MatchConstants";
import { Constants } from "../../../../../Constants";
import { useNavigate } from "react-router-dom";

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
                            pointerEvents: "none",
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
                            height: "320%",
                            width: "50%",
                            position: 'relative', 
                            top: '100%', 
                        }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: 'error', }}>
                    Cancel
                    </Typography> </Button>
                    
                <Button
                variant={"outlined"}
                color="error"
                onClick={() => {
                    data.deletePrevious(stage);
                 update();}}
                 sx={{
                   height: "320%",
                   width: "50%",
                   position: 'relative', 
                   top: '100%', 
                    }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
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
                    



                </Stack>


                    <Stack
                        direction={"row"}
                        spacing={1}
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
                            sx={{
                                position: 'relative', 
                              top: '200%',
                              left: '1%',
                              width: '145%'
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
                            sx={{
                                position: 'relative', 
                              top: '200%',
                              left: '1%',
                              width: '145%'
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
                                handleStageChange(data.stage + 1);
                                update();
                            }}
                        >
                            Submit
                        </Button>
                    )}
                </Stack>
                </Stack>

                <Button
    variant="outlined"
    onClick={() => {
        setCookie('flipMap', !cookies.flipMap);
        update();
    }}
    sx={{
        height: "20px",
        width: "10%",
        mx: 1,
        position: 'relative',
        top: '-45px',
        left: '39%',
        color: cookies.flipMap ? "rgba(73, 133, 230)" : "rgba(251, 0, 0)",
        borderColor: cookies.flipMap ? "rgba(73, 133, 230)" : "rgba(251, 0, 0)",
        '&:hover': {
            color: cookies.flipMap ? "rgba(73, 133, 230)" : "rgba(251, 0, 0)", // Ensures the color doesn't change
            borderColor: cookies.flipMap ? "rgba(73, 133, 230)" : "rgba(251, 0, 0)", // Ensures border color doesn't change
            backgroundColor: 'transparent', // Avoid any hover background changes
        },
    }}
>
    {cookies.flipMap ? "Flip" : "Flip"}
</Button>

                
        </Grid>
    )
}