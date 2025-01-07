import {useState} from "react";
import {MatchStage} from "../../MatchConstants";
import CustomToggleButton from "./form_elements/CustomToggleButton";
import CustomRating from "./form_elements/CustomRating";
import {Collapse, Stack} from "@mui/material";
import InputTable from "./form_elements/InputTable";
import MapSim from "./form_elements/map/MapSim";

export default function MSTeleop(props) {
    const [data, _] = useState(props.data);
    const [counter, setCounter] = useState(0);
    const [selectedRow, setSelectedRow] = useState(0);
    const [dockPosition, setDockPosition] = useState(0);

    const update = () => {
        setCounter(counter + 1);
    };

    return (
        <>
            <Stack direction={"column"} spacing={2}>
                <Stack alignItems="center" spacing={6}>
                    <MapSim
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                        dockPosition={dockPosition}
                        setDocPosition={setDockPosition}
                        update={update}
                        stage={MatchStage.TELEOP}
                        data={data}
                    />
                    <InputTable 
                        stage={MatchStage.TELEOP}
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                        data={data}
                    />
                </Stack>
            </Stack>
        </>
    );
}
