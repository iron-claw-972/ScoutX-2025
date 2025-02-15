import { Alert, Button, Collapse, Divider, IconButton, Stack, Typography, Box, Container } from "@mui/material";
import Page from "../Page";
import { useEffect, useMemo, useState } from "react";
import MatchScoutData from "../MatchScoutData";
import { MatchStage, IntakeElement, IntakeLocations } from "../MatchConstants";
import MSAuto from "./matchscout/MSAuto";
import MSPrematch from "./matchscout/MSPrematch";
import MSPostmatch from "./matchscout/MSPostmatch";
import MSTeleop from "./matchscout/MSTeleop";
import CloseIcon from "@mui/icons-material/Close";
import Gambling from "./Gambling";

export default function MatchScout() {
    // Memoize the `data` object to avoid re-creating it on each render
    let data = useMemo(() => new MatchScoutData(), []);

    // Add a `useState` hook to manage the stage
    const [stage, setStage] = useState(data.stage);

    // Add a `useState` for the current component
    const [currentComponent, setCurrentComponent] = useState(<MSPrematch data={data} />);

    // Define a function to handle stage changes
    const handleStageChange = (newStage) => {
        data.stage = newStage; // Synchronize the data object
        setStage(newStage); // Update the state to trigger re-render
    };

    useEffect(() => {
        switch (stage) {
            case MatchStage.PRE_MATCH:
                setCurrentComponent(<MSPrematch data={data} />);
                break;
            case MatchStage.AUTO:
                setCurrentComponent(<MSAuto data={data} handleStageChange={handleStageChange}/>);
                break;
            case MatchStage.TELEOP:
                setCurrentComponent(<MSTeleop data={data} handleStageChange={handleStageChange} />);
                break;
            case MatchStage.POST_MATCH:
                setCurrentComponent(<MSPostmatch data={data} handleStageChange={handleStageChange}/>);
                break;
            case MatchStage.GAMBLING:
                setCurrentComponent(<Gambling data={data} handleStageChange={handleStageChange}/>);
                break;
        }
    }, [stage]);

    return (
        <Container>
            <Typography color={"white"} variant={"h4"}>
                Match Scout
            </Typography>
            <Typography variant={"h6"}>
                {Object.keys(MatchStage)[stage].replace("_", " ")}
            </Typography>
            <Divider
                sx={{
                    my: 1.5,
                }}
            />
            <Collapse in={data.alert.open}>
                <Alert
                    sx={{
                        mb: 3,
                    }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                data.alert.open = false;
                                setStage(stage); // Trigger re-render
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    severity={data.alert.severity}
                >
                    {data.alert.message}
                </Alert>
            </Collapse>
            {currentComponent}
            <Stack
                direction={"row"}
                spacing={2}
                sx={{
                    my: stage == MatchStage.AUTO || stage == MatchStage.TELEOP ? 0.5 : 2,
                }}
            >
                {stage == MatchStage.POST_MATCH && (
                    <Button
                        fullWidth
                        variant={"outlined"}
                        onClick={() => handleStageChange(stage - 1)}
                    >
                        Previous
                    </Button>
                )}
                {stage == MatchStage.PRE_MATCH && (
                    <Button
                        sx={{ width: "100%" }}
                        variant={"outlined"}
                        onClick={() => {
                            if (data.validate().valid) {
                                handleStageChange(stage + 1);
                            }
                        }}
                    >
                        Next
                    </Button>
                )}
                {stage === MatchStage.POST_MATCH && (
                    <Button
                        fullWidth
                        color={"success"}
                        variant={"outlined"}
                        onClick={() => {
                            data.submit(); 
                            handleStageChange(stage + 2);
                        }}
                    >
                        Submit
                    </Button>
                )}
            </Stack>
        </Container>
    );
}
