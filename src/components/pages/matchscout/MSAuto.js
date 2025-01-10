import {useRef, useState} from "react";
import {Stack} from "@mui/material";
import {MatchStage, IntakeElement} from "../../MatchConstants";
import CustomToggleButton from "./form_elements/CustomToggleButton";
import {useCookies} from "react-cookie";
import InputTable from "./form_elements/InputTable";
import MapSim from "./form_elements/map/MapSim";

export default function MSAuto({ data, handleStageChange}) {
    const [counter, setCounter] = useState(0);  
    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedIntakeElement, setSelectedIntakeElement] = useState(0);
    const [selectedIntakeLocation, setSelectedIntakeLocation] = useState(0);

    const update = () => {
        setCounter(counter + 1);
    };

    return (
        <Stack direction={"column"} spacing={2}>
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
