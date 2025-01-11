import { Grid, Button, Box, Typography } from "@mui/material";
import IntakeButton from "./IntakeButton";
import { Stack } from "@mui/system";
import CustomToggleButton from "../CustomToggleButton";
import {useCookies} from "react-cookie";
import { useState } from "react";
import { MatchStage } from "../../../../MatchConstants";

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

                <Stack direction={"row"} spacing={"2px"} justifyContent={"space-between"}>
                    <CustomToggleButton
                        label={"cancel"}
                        onClick={() => {
                            setSelectedIntakeElement(0);
                            setSelectedIntakeLocation(0);
                            stopStopwatch();
                            setElapsedTime(0);
                        }}
                        sx={{width: `${(20 / 100) * boxDimensions.height}px`}}
                    />

                    <Typography variant="h6">
                        {"⏰: " + formatTime(elapsedTime)}
                    </Typography>

                    <CustomToggleButton
                        label={"Delete Prev."}
                        onClick={() => {
                            data.deletePrevious(stage); 
                            update(); 
                        }}
                    />

                    <Typography variant="h6">
                        {data.getOuttakeCount(stage)}
                    </Typography>
                    

                </Stack>

                <Stack direction={'column'} spacing={'8px'}>

                    <CustomToggleButton
                        label={"Flip Map"}
                        value={cookies.flipMap}
                        onClick={(newValue) => {
                            setCookie('flipMap', newValue);
                            update();
                        }}
                        showCheckbox
                        sx={{mx: 1}}
                    />

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
                                setSelectedIntakeElement(0);
                                setSelectedIntakeLocation(0);
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
                
            </Stack>
        </Grid>
    )
}