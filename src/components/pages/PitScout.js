import React, {useState} from 'react';
import {
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    ListItemIcon,
    ListItemText,
    Divider,
    Box
} from '@mui/material';
import SmallNumberCounter from "./matchscout/form_elements/SmallNumberCounter";
import CustomInput from "./matchscout/form_elements/CustomInput";
import {doc, getFirestore, setDoc} from 'firebase/firestore';
import { Constants } from '../../Constants';


const PitScout = (props) => {
    const [teamNumber, setTeamNumber] = useState("");
    const [drivetrain, setDrivetrain] = useState("");
    const [intake, setIntake] = useState("");
    const [climb, setClimb] = useState("");
    const [robotType, setRobotType] = useState([]);
    const [extraNotes, setExtraNotes] = useState("");

    const robotTypeFields = [
        'WCP CC Robot', 
        'Everybot', 
        'Kitbot', 
        'Cranberry Alarm type Bot',
        'Windmill Side Elevator Bot',
        'REV Starter Bot',
        "Regular Sideways Elevator",
        "2 Dof Arm On elevator",
    ]

    const handleTeamNumberChange = (event) => {
        setTeamNumber(event.target.value);
    };

    // Drivertrain Types: 
    // Swerve
    // Tank
    const handleDrivetrain = (event) => {
        setDrivetrain(event.target.value);
    };

    const handleIntake = (event) => {
        setIntake(event.target.value);
    };

    const handleClimb = (event) => {
        setClimb(event.target.value);
    };

    // Robot Types:
    // WCP CC Robot 
    // Everybot 
    // Kitbot 
    // Cranberry Alarm type Bot
    // Windmill Side Elevator Bot
    // REV Starter Bot
    // Regular Sideways Elevator
    // 2 Dof Arm On elevator

    const handleRobotType = (event) => {
        setRobotType(event.target.value)
    }

    const handleSubmit = async () => {
        if (!teamNumber.trim()) {
            return;
        }

        const pitData = {
            teamNumber: teamNumber,
            drivetrain: drivetrain,
            intake: intake,
            climb: climb,
            robotType: robotType,
            extraNotes: extraNotes
        }

        const db = getFirestore();
        await setDoc(doc(db, "pitData", teamNumber),
            pitData
        );
        window.location.reload();
    };

    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
        }}
        >
            <Stack direction={"column"} width="75%" spacing={4}>
            <Typography color="" variant="h4" gutterBottom width="100%" textAlign="center" sx={{ 
                        color: "white", 
                        mb: 0
                    }}
                    >
                        Pit Scout
                    </Typography>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}>
                        <Divider sx={{ width: "75%", backgroundColor: "#bdbdbd" }} />
                    </Box>

                <TextField
                    label="Team Number"
                    variant="outlined"
                    value={teamNumber}
                    onChange={handleTeamNumberChange}
                    
                />
                <FormControl width="100%">
                    <InputLabel id="demo-simple-select-label">Drivetrain</InputLabel>
                    <Select
                        value={drivetrain}
                        label="Drivetrain"
                        onChange={handleDrivetrain}>
                        <MenuItem value={"Tank"}>
                            Tank
                        </MenuItem>
                        <MenuItem value={"Swerve"}>
                            Swerve
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Robot Types</InputLabel>
                    <Select
                        multiple
                        fullWidth
                        margin="normal"
                        value={robotType}
                        label={"Robot Types"}
                        onChange={handleRobotType}
                        renderValue={(selected) => selected.join(", ")}
                    >
                        {robotTypeFields.map((field) => (
                            <MenuItem value={field}>
                                {field}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel>Intake</InputLabel>
                    <Select
                        fullWidth
                        margin="normal"
                        value={intake}
                        label="Intake"x
                        onChange={handleIntake}
                    >
                        <MenuItem value={"Ground"}>
                            Ground
                        </MenuItem>
                        <MenuItem value={"Station"}>
                            Station
                        </MenuItem>
                        <MenuItem value={"Ground and Station"}>
                            Ground and Station
                        </MenuItem>
                        <MenuItem value={"Ground and Station"}>
                            Ground and Station
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Climb</InputLabel>
                    <Select
                        value={climb}
                        label="Climb"
                        onChange={handleClimb}>
                        <MenuItem value={"Deep Climb"}>Deep Climb</MenuItem>
                        <MenuItem value={"Shallow Climb"}>Shallow Climb</MenuItem>
                        <MenuItem value={'Both Shallow and Deep Climb'}>Both Shallow and Deep Climb</MenuItem>
                        <MenuItem value={"No Climb"}>No Climb</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Extra Information"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={extraNotes}
                    onChange={(e) => setExtraNotes(e.target.value)} 
                />
                <Button
                    sx={{ backgroundColor: "#ff9800", color: "white", '&:hover': { backgroundColor: "#e65100" } }}
                    fullWidth
                    variant='contained'
                    onClick={handleSubmit}>
                    Submit Pit Scout
                </Button>
            </Stack>
        </Box>
    );
};

export default PitScout;
