import {useRef, useState} from "react";
import {Stack} from "@mui/material";
import {MatchStage} from "../../MatchConstants";
import CustomToggleButton from "./form_elements/CustomToggleButton";
import {useCookies} from "react-cookie";
import InputTable from "./form_elements/InputTable";
import MapSim from "./form_elements/map/MapSim";

export default function MSAuto(props) {
    const [data, _] = useState(props.data);
    const [counter, setCounter] = useState(0);  
    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedIntake, setSelectedIntake] = useState(0);

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
                    update={update}
                    stage={MatchStage.AUTO}
                    data={data}
                />
            </Stack>
            
        </Stack>
    );
}
