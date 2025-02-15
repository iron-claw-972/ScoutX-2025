import {useRef, useState} from "react";
import {Button, Stack} from "@mui/material";
import {MatchStage, IntakeElement, IntakeLocations} from "../../MatchConstants";
import LeaveButton from "./form_elements/LeaveButton";
import {useCookies} from "react-cookie";
import InputTable from "./form_elements/InputTable";
import MapSim from "./form_elements/map/MapSim";

export default function MSAuto({ data, handleStageChange}) {
    const [counter, setCounter] = useState(0);  
    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedIntakeElement, setSelectedIntakeElement] = useState(IntakeElement.CORAL);
    const [selectedIntakeLocation, setSelectedIntakeLocation] = useState(IntakeLocations.PRELOAD);

    const update = () => {
        setCounter(counter + 1);
        

    
    };

    return (
        <Stack direction={"column"} spacing={2}>
             <LeaveButton
                label={"Leave?"}
                value={data.get(MatchStage.AUTO, "leave")}
                onClick={(newValue) => {
                    data.set(MatchStage.AUTO, "leave", newValue);
                    update();
                }}
                showCheckbox={false}
            />
            <Stack cc spacing={6}>
                <MapSim
                    selectedRow={selectedRow}
                    setSelectedRow={setSelectedRow}
                    selectedIntakeElement={selectedIntakeElement}
                    setSelectedIntakeElement={setSelectedIntakeElement}
                    selectedIntakeLocation={selectedIntakeLocation}
                    setSelectedIntakeLocation={setSelectedIntakeLocation}
                    update={update}
                    stage={MatchStage.AUTO}
                    data={data}
                    handleStageChange={handleStageChange} // Pass the function correctly
                />
            </Stack>
        </Stack>
    );
}
