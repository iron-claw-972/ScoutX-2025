import { Button, Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Stack } from "@mui/system";
import { useState, useEffect, useRef } from "react";
import { Constants } from "../../../../../Constants";
import RowButton from "./RowButton";
import DockButton from "./DockButton";
import {useCookies} from "react-cookie";
import CustomToggleButton from "../CustomToggleButton";
import GroundButton from "./GroundButton";
import SubstationButton from "./SubstationButton";
import { IntakeElement, MatchStage } from "../../../../MatchConstants";
import IntakeTable from "./IntakeTable";
import ProcessorButton from "./ProcessorButton";
import NetButton from "./NetButton";
import ReefButton from "./ReefButton";
import CoralStationButton from "./CoralStationButton";
import ReefOuttakeTable from "./ReefOuttakeTable";

export default function MapSim(
    {
        selectedRow, 
        setSelectedRow, 
        selectedIntakeElement,
        setSelectedIntakeElement,
        selectedIntakeLocation,
        setSelectedIntakeLocation,
        update,
        stage,
        data,
        handleStageChange
    }) 
    {
    
    //turn to all horizontal later
    const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
    const [cookies, setCookie] = useCookies(); 
    
    const outtakeCoral = selectedIntakeElement == IntakeElement.CORAL && selectedIntakeLocation != 0;

    const [elapsedTime, setElapsedTime] = useState(0); // Stopwatch time in seconds
    const [isRunning, setIsRunning] = useState(false); // Stopwatch running status
    const timerRef = useRef(null); // Reference to store the interval ID

    useEffect(() => {
        const handleResize = () => {
            setIsPortrait(window.innerHeight > window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const startStopwatch = () => {
        clearInterval(timerRef.current); // Clear any existing interval
        setElapsedTime(0); // Reset elapsed time
        setIsRunning(true); // Set running state to true
        const startTime = Date.now();
        timerRef.current = setInterval(() => {
            setElapsedTime(Date.now() - startTime); // Update elapsed time
        }, 10); // Update every 10ms for milliseconds precision
    };
    
    // Stop the stopwatch
    const stopStopwatch = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(timerRef.current); // Stop the interval
        }
    };
    
    // Cleanup interval on component unmount
    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    // Format time to MM:SS:MS
    const formatTime = (time) => {
        const milliseconds = Math.floor((time % 1000) / 10); // Show only two digits for milliseconds
        const seconds = Math.floor((time / 1000) % 60);

        return `${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
    };




    useEffect(() => {
        const handleResize = () => {
            setIsPortrait(window.innerHeight > window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const AutoMarkers = [
        <GroundButton
            x={83}
            y={26.8}
            selectedIntakeElement={selectedIntakeElement}
            setSelectedIntakeElement={setSelectedIntakeElement}
            selectedIntakeLocation={selectedIntakeLocation}
            setSelectedIntakeLocation={setSelectedIntakeLocation}
            startStopwatch={startStopwatch}
            stopStopwatch={stopStopwatch}
            elapsedTime={elapsedTime}
        />,
        <ProcessorButton
            x={60}
            y={10}
            selectedIntakeElement={selectedIntakeElement}
            setSelectedIntakeElement={setSelectedIntakeElement}
            selectedIntakeLocation={selectedIntakeLocation}
            setSelectedIntakeLocation={setSelectedIntakeLocation}
            startStopwatch={startStopwatch}
            stopStopwatch={stopStopwatch}
            elapsedTime={elapsedTime}
        />,
        <NetButton
            x={48.5}
            y={10}
            selectedIntakeElement={selectedIntakeElement}
            setSelectedIntakeElement={setSelectedIntakeElement}
            selectedIntakeLocation={selectedIntakeLocation}
            setSelectedIntakeLocation={setSelectedIntakeLocation}
            startStopwatch={startStopwatch}
            stopStopwatch={stopStopwatch}
            elapsedTime={elapsedTime}
        />,
        <ReefButton
            x={64.5}
            y={35.5}
            selectedIntakeElement={selectedIntakeElement}
            setSelectedIntakeElement={setSelectedIntakeElement}
            selectedIntakeLocation={selectedIntakeLocation}
            setSelectedIntakeLocation={setSelectedIntakeLocation}
            startStopwatch={startStopwatch}
            stopStopwatch={stopStopwatch}
            elapsedTime={elapsedTime}
        />,
        <CoralStationButton
            x={86.5}
            y={9}
            selectedIntakeElement={selectedIntakeElement}
            setSelectedIntakeElement={setSelectedIntakeElement}
            selectedIntakeLocation={selectedIntakeLocation}
            setSelectedIntakeLocation={setSelectedIntakeLocation}
            startStopwatch={startStopwatch}
            stopStopwatch={stopStopwatch}
            elapsedTime={elapsedTime}
        />,
        <CoralStationButton
            x={86.5}
            y={73.5}
            selectedIntakeElement={selectedIntakeElement}
            setSelectedIntakeElement={setSelectedIntakeElement}
            selectedIntakeLocation={selectedIntakeLocation}
            setSelectedIntakeLocation={setSelectedIntakeLocation}
            startStopwatch={startStopwatch}
            stopStopwatch={stopStopwatch}
            elapsedTime={elapsedTime}
        />,
        <Button
            variant={"contained"}
            color={"error"}
            onClick={() => {
                data.incrementMissedCount(stage, 7);
                setSelectedIntakeLocation(0);
                setSelectedIntakeElement(0); 
                stopStopwatch();
            }}
            disabled={selectedIntakeElement == 0 || selectedIntakeLocation == 0}
            sx={{
                position: 'absolute',
                top: '75%',
                right: '22%',
                width: '100px',
                height: '40px',
            }}
        >
        Missed
        </Button>
    ]
    const AutoMarkersFlipped = [
    
    ]
    const TeleopMarkers = [
        
    ]
    const TeleopMarkersFlipped = [
        
    ]
    const ReefMarkers = [
        <ReefOuttakeTable
            selectedIntakeElement={selectedIntakeElement}
            setSelectedIntakeElement={setSelectedIntakeElement}
            selectedIntakeLocation={selectedIntakeLocation}
            setSelectedIntakeLocation={setSelectedIntakeLocation}
            x={73.2}
            y={8}
            startStopwatch={startStopwatch}
            stopStopwatch={stopStopwatch}
            elapsedTime={elapsedTime}
        />,

        <Button
            variant={"contained"}
            color={"error"}
            onClick={() => {
                data.incrementMissedCount(stage, 7);
                setSelectedIntakeLocation(0);
                setSelectedIntakeElement(0); 
                stopStopwatch();
            }}
            disabled={selectedIntakeElement == 0 || selectedIntakeLocation == 0}
            sx={{
                position: 'absolute',
                top: '81%',
                right: '1.8%',
                width: '298px',
                height: '38px',
            }}
        >
        Missed
        </Button>
    ]

    
    const markers = !outtakeCoral ? 
        (stage === MatchStage.AUTO
        ? (cookies.flipMap ? AutoMarkersFlipped : AutoMarkers)
        : (cookies.flipMap ? TeleopMarkersFlipped : TeleopMarkers))
        : ReefMarkers
        ;

    return (
        
        <Grid2 sx={{ position: "relative" }}>

            <Stack direction={"column"} spacing={2}>
                <Stack>
                    <Box
                        component={"img"}
                        src={!outtakeCoral ? (cookies.flipMap ? Constants.fieldFlipped : Constants.field) : Constants.fieldReef}
                        sx={{
                            width: "100%",
                            height: "auto",
                        }}
                    />

                    <IntakeTable
                    sx={{
                        position: 'absolute',
                        top: isPortrait ? '8%' : '10%',
                        left: isPortrait ? '3%' : '2%'
                    }}
                    update={update}
                    stage={stage}
                    data={data}
                    selectedIntakeElement={selectedIntakeElement}
                    setSelectedIntakeElement={setSelectedIntakeElement}
                    selectedIntakeLocation={selectedIntakeLocation}
                    setSelectedIntakeLocation={setSelectedIntakeLocation}
                    handleStageChange={handleStageChange}
                    formatTime={formatTime}
                    elapsedTime={elapsedTime}
                    isRunning={isRunning}
                    startStopwatch={startStopwatch}
                    stopStopwatch={stopStopwatch}
                    setElapsedTime={setElapsedTime}
                    />

                    <Stack direction={"column"}>
                    {markers.map((marker) => {
                        return marker;
                    })}

                    </Stack>
                </Stack>
            </Stack>
        </Grid2>
    )
}