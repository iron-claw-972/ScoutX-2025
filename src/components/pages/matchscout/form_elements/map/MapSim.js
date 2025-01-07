import { Button, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Stack } from "@mui/system";
import { useState } from "react";
import { Constants } from "../../../../../Constants";
import RowButton from "./RowButton";
import DockButton from "./DockButton";
import {useCookies} from "react-cookie";
import CustomToggleButton from "../CustomToggleButton";
import GroundButton from "./GroundButton";
import SubstationButton from "./SubstationButton";
import { MatchStage } from "../../../../MatchConstants";

export default function MapSim(
    {
        selectedRow, 
        setSelectedRow, 
        update,
        stage,
        data
    }) 
    {
    
    const [cookies, setCookie] = useCookies(); 

    const AutoMarkers = [
        <RowButton
            selectedRow = {selectedRow}
            setSelectedRow={setSelectedRow}
            rowNumber={1}
            x = {75}
            y = {15}
        />,
        <RowButton
            selectedRow = {selectedRow}
            setSelectedRow={setSelectedRow}
            rowNumber={2}
            x = {75}
            y = {33}
        />,
        <RowButton
            selectedRow = {selectedRow}
            setSelectedRow={setSelectedRow}
            rowNumber={3}
            x = {75}
            y = {51}
        />,
        <RowButton
            selectedRow = {selectedRow}
            setSelectedRow={setSelectedRow}
            rowNumber={4}
            x = {75}
            y = {69}
        />
        
    ]
    const AutoMarkersFlipped = [
        <RowButton
            selectedRow = {selectedRow}
            setSelectedRow={setSelectedRow}
            rowNumber={4}
            x = {0.5}
            y = {15}
        />,
        <RowButton
            selectedRow = {selectedRow}
            setSelectedRow={setSelectedRow}
            rowNumber={3}
            x = {0.5}
            y = {33}
        />,
        <RowButton
            selectedRow = {selectedRow}
            setSelectedRow={setSelectedRow}
            rowNumber={2}
            x = {0.5}
            y = {51}
        />,
        <RowButton
           selectedRow = {selectedRow}
           setSelectedRow={setSelectedRow}
           rowNumber={1}
           x = {0.5}
           y = {69}
    />
    
    ]
    const TeleopMarkers = [
        <GroundButton
            selectedRow = {selectedRow}
            setSelectedRow={setSelectedRow}
            x = {75}
            y = {15}
        />,
        <SubstationButton
            selectedRow = {selectedRow}
            setSelectedRow={setSelectedRow}
            x = {75}
            y = {50}
        />,
        
    ]
    const TeleopMarkersFlipped = [
        <GroundButton
            selectedRow = {selectedRow}
            setSelectedRow={setSelectedRow}
            rowNumber={1}
            x = {0.5}
            y = {15}
        />,
        <SubstationButton
            selectedRow = {selectedRow}
            setSelectedRow={setSelectedRow}
            rowNumber={2}
            x = {0.5}
            y = {50}
        />,
    ]

    
    const markers = stage === MatchStage.AUTO
        ? (cookies.flipMap ? AutoMarkersFlipped : AutoMarkers)
        : (cookies.flipMap ? TeleopMarkersFlipped : TeleopMarkers);

    return (
        <Grid2 sx={{ position: "relative" }}>
            <Stack direction={"column"} spacing={2}>
                <Stack>
                    <Box
                        component={"img"}
                        src={Constants.field}
                        sx={{
                            width: "100%",
                            height: "auto",
                            transform: `scaleX(${cookies.flipMap ? -1 : 1})`,
                        }}
                    />

                    <Button
                        variant={"contained"}
                        color={"error"}
                        onClick={() => {
                            data.incrementMissedCount(stage, 7);
                            setSelectedRow(0); 
                        }}
                        disabled={!selectedRow}
                        sx={{
                            position: 'absolute',
                            top: '3%',
                            left: '81%',
                            width: '150px',
                            height: '50px',
                        }}
                    >
                        Missed
                    </Button>

                    <DockButton
                        x = {(cookies.flipMap ? 41.5 : 46.5)}
                        y = {(cookies.flipMap ? 54 : 55)}
                        data={data}
                        stage={stage}
                    />

                    <Stack direction={"column"}>
                    {markers.map((marker) => {
                        return marker;
                    })}

                    </Stack>
                </Stack>
                <CustomToggleButton
                        label={"Flip Map"}
                        value={cookies.flipMap}
                        onClick={(newValue) => {
                            setCookie('flipMap', newValue);
                            update();
                        }}
                        showCheckbox
                />
            </Stack>
        </Grid2>
    )
}