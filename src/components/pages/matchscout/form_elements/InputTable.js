import React, { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import IncrementCounter from "./IncrementCounter";
import {MatchStage} from "../../../MatchConstants";

export default function InputTable({ stage, selectedRow, setSelectedRow, data }) {
    const [counter, setCounter] = useState(0);  
    const update = () => {
        setCounter(counter + 1);
    };

    //works
    const updateCount = (stage, countType, key, newValue) => {
        const oldValue = data.getCount(stage, countType, key);
        
        if (newValue > oldValue) {
            data.setCount(stage, countType, key, oldValue + 1, selectedRow);
            
        } 
        else if (newValue < oldValue) {
            data.setCount(stage, countType, key, oldValue - 1, selectedRow);
        }
        
        setSelectedRow(0); 
        update();
    };

    return (
        <Grid2>
            <Stack direction={"row"} spacing={10}>
                <Stack direction={"column"} spacing={3} paddingTop={'85px'}>
                    <div style={{width: '50px', height: '76px'}}>
                        <Typography variant={"h4"}>Top</Typography>
                    </div>
                    <div style={{width: '50px', height: '76px'}}>
                        <Typography variant={"h4"}>Middle</Typography>
                    </div>
                    <div style={{width: '50px', height: '76px'}}>
                        <Typography variant={"h4"}>Bottom</Typography>
                    </div>
                </Stack>
                <Stack direction={"column"} spacing={3} alignItems={'center'}>
                    <Typography variant={"h4"}>Cones</Typography>
                    <Stack direction={"row"}>
                        <IncrementCounter
                            value={data.getCount(stage, "coneCounts", 'top')}
                            onChange={(newValue) => {
                                updateCount(stage, "coneCounts", `top`, newValue);  
                            }}
                            selectedRow={selectedRow}
                            setSelectedRow={setSelectedRow}
                        />
                    </Stack>
                    <IncrementCounter
                        value={data.getCount(stage, "coneCounts", `middle`)}
                        onChange={(newValue) => {
                            updateCount(stage, "coneCounts", `middle`, newValue);
                        }}
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                    />
                    <IncrementCounter
                        value={data.getCount(stage, "coneCounts", `bottom`)}
                        onChange={(newValue) => {
                            updateCount(stage, "coneCounts", `bottom`, newValue);
                        }}
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                    />
                </Stack>
                <Stack direction={"column"} spacing={3} alignItems={'center'}>
                    <Typography variant={"h4"}>Cubes</Typography>
                    <IncrementCounter
                        value={data.getCount(stage, "cubeCounts", `top`)}
                        onChange={(newValue) => {
                            updateCount(stage, "cubeCounts", `top`, newValue);
                        }} 
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}   
                    />
                    <IncrementCounter
                        value={data.getCount(stage, "cubeCounts", `middle`)}
                        onChange={(newValue) => {
                            updateCount(stage, "cubeCounts", `middle`, newValue);
                        }}
                        selectedRow={selectedRow}                                
                        setSelectedRow={setSelectedRow}
                    />
                    <IncrementCounter
                        value={data.getCount(stage, "cubeCounts", `bottom`)}
                        onChange={(newValue) => {
                            updateCount(stage, "cubeCounts", `bottom`, newValue);
                        }}
                        selectedRow={selectedRow}                            
                        setSelectedRow={setSelectedRow}
                    />
                </Stack>
            </Stack>
        </Grid2>
    );
}
