import {useRef, useState} from "react";
import {Stack} from "@mui/material";
import {MatchStage, IntakeElement, IntakeLocations} from "../../MatchConstants";
import CustomToggleButton from "./form_elements/CustomToggleButton";
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
            <CustomToggleButton
                label={"Leave?"}
                value={data.get(MatchStage.AUTO, "leave")}
                onClick={(newValue) => {
                    data.set(MatchStage.AUTO, "leave", newValue);
                    update();
                }}
                showCheckbox={false}
            />
            <Stack alignItems="center" spacing={6}>
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
