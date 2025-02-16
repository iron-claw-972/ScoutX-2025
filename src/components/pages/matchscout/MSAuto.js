import {useRef, useState} from "react";
import {Button, MenuItem, Select, Stack, InputLabel, Box, FormControl } from "@mui/material";
import {MatchStage, IntakeElement, IntakeLocations} from "../../MatchConstants";
import LeaveButton from "./form_elements/LeaveButton";
import {useCookies} from "react-cookie";
import InputTable from "./form_elements/InputTable";
import MapSim from "./form_elements/map/MapSim";

export default function MSAuto({ data, handleStageChange}) {
    const [counter, setCounter] = useState(0);  
    const [deleteData, setDeleteData] = useState(null); 
    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedIntakeElement, setSelectedIntakeElement] = useState(IntakeElement.CORAL);
    const [selectedIntakeLocation, setSelectedIntakeLocation] = useState(IntakeLocations.PRELOAD);
    const [isFocused, setIsFocused] = useState(false); 

    const update = () => {
        setCounter(counter + 1);
    };

    const handleDelete = () => {
        if (deleteData !== null) {
            data.delete(MatchStage.AUTO, deleteData); 
            setDeleteData(null); 
            update(); 
        }
    }
    const getDisplayValue = () => {
        if (deleteData !== null) {
            const selectedOuttake = data.get(MatchStage.AUTO, 'outtakeCounts')[deleteData];
            return `${selectedOuttake.intakeLocation} ${selectedOuttake.element} ${selectedOuttake.outtakeLocation}`;
        }
        return "";  // Default text when nothing is selected
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
            {data.get(MatchStage.AUTO, 'outtakeCounts').length > 0 && ( 
            <FormControl fullWidth>
            <InputLabel shrink={isFocused || deleteData !== null}>Previous Outtakes</InputLabel>
            <Select
                value={deleteData}
                onChange={(e) => setDeleteData(e.target.value)}  // Update state on change
                displayEmpty
                renderValue={getDisplayValue}
                label= { isFocused || deleteData !== null ? "Previous Outtakes" : ""}
                onFocus={() => setIsFocused(true)}  // Track focus
                onBlur={() => setIsFocused(false)}   // Track blur
            >
                {data.get(MatchStage.AUTO, 'outtakeCounts').map((data, idx) => (
                    <MenuItem key={idx} value={idx}>
                        {idx + 1 + ". " + data.intakeLocation + " " + data.element + " " + data.outtakeLocation} 
                    </MenuItem>
                ))}
            </Select>
            </FormControl>
            )}
            {deleteData != null && (
                <Button 
                    variant="outlined" 
                    color="error" 
                    sx={{ mt: 2 }} 
                    onClick={handleDelete} 
                    fullWidth>
                    Delete Outtake
              </Button>
            )}
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
