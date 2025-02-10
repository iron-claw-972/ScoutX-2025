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
    ListItemText
} from '@mui/material';
import SmallNumberCounter from "./matchscout/form_elements/SmallNumberCounter";
import CustomInput from "./matchscout/form_elements/CustomInput";
import {doc, getFirestore, setDoc} from 'firebase/firestore';
import { Constants } from '../../Constants';


const PitScout = (props) => {
    const [teamNumber, setTeamNumber] = useState('');
    const [robotFeatures, setRobotFeatures] = useState('');
    const [drivetrain, setDrivetrain] = useState("");
    const [intake, setIntake] = useState("");
    const [climb, setClimb] = useState("");
    const [robotType, setRobotType] = useState("");
    const [understage, setUnderstage] = useState(false);
    const [batteryNumber, setBatteryNumber] = useState(0);
    const [extraNotes, setExtraNotes] = useState("");

    const handleTeamNumberChange = (event) => {
        setTeamNumber(event.target.value);
    };

    const handleRobotFeaturesChange = (event) => {
        setRobotFeatures(event.target.value);
    };

    const handleDrivetrain = (event) => {
        setDrivetrain(event.target.value);
    };

    const handleIntake = (event) => {
        setIntake(event.target.value);
    };

    const handleClimb = (event) => {
        setClimb(event.target.value);
    };

    const handleRobotType = (event) => {
        setRobotType(event.target.value)
    }

    const handleBatteryNumber = (newValue) => {
        if (newValue === '' || (!isNaN(newValue) && newValue >= 0)) {
            setBatteryNumber(newValue);
        }
    }

    const handleExtraNotes = (newValue) => {
        setExtraNotes(newValue);
    }

    const handleSubmit = async () => {
        const pitData = {
            teamNumber: teamNumber,
            drivetrain: drivetrain,
            intake: intake,
            climb: climb,
            robotType: robotType,
            understage: understage,
            batteryNumber: batteryNumber,
            extraNotes: extraNotes
        }
        // You can handle the form submission logic here
        console.log(`Scouting Team ${teamNumber}'s pit with features: ${robotFeatures}`);
        // Add further logic as needed
        const db = getFirestore();
        await setDoc(doc(db, "pitData", teamNumber),
            pitData
        );
        window.location.reload();
    };

    return (
        <Container maxWidth="md" style={{padding: '20px', marginTop: '20px'}}>
            <Stack direction={"column"} spacing={2}>
                <Typography variant="h4" gutterBottom>
                    Pit Scouting Form
                </Typography>

                <TextField
                    label="Team Number"
                    variant="outlined"
                    value={teamNumber}
                    onChange={handleTeamNumberChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Drivetrain</InputLabel>
                    <Select
                        value={drivetrain}
                        label="Drivetrain"
                        onChange={handleDrivetrain}>
                        <MenuItem value={0}></MenuItem>
                        <MenuItem value={1}>
                        <ListItemIcon>
                                <img
                                    src={Constants.tankDrive}
                                    alt="Tank"
                                    style={{ width: 100, height: 80 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Tank" />
                        </MenuItem>
                        <MenuItem value={2}>
                        <ListItemIcon>
                                <img
                                    src={Constants.swerveDrive}
                                    alt="Swerve"
                                    style={{ width: 100, height: 80 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Swerve" />
                            </MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Robot Type</InputLabel>
                    <Select
                        fullWidth
                        margin="normal"
                        value={robotType}
                        label={"Robot Type"}
                        onChange={handleRobotType}>
                        <MenuItem value={0}></MenuItem>
                        <MenuItem value={1}>
                        <ListItemIcon>
                                <img
                                    src={Constants.WCPBot}
                                    alt="WCP Competitive Concept"
                                    style={{ width: 70, height: 80 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="WCP Competitive Concept" />
                        </MenuItem>
                        <MenuItem value={2}>Everybot</MenuItem>
                        <MenuItem value={3}>
                        <ListItemIcon>
                                <img
                                    src={Constants.kitBot}
                                    alt="Kit Bot"
                                    style={{ width: 70, height: 80 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Kit Bot" />
                        </MenuItem>
                        <MenuItem value={4}>
                        <ListItemIcon>
                                <img
                                    src={Constants.cranberryAlarmBot}
                                    alt="Cranberry Alarm Bot"
                                    style={{ width: 70, height: 80 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Cranberry Alarm Bot" />
                        </MenuItem>
                        <MenuItem value={5}>Windmill Bot</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Intake"
                    variant="outlined"
                    helperText={
                        "Ground? Station?"
                    }
                    multiline
                    rows={1}
                    value={intake}
                    onChange={handleIntake}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Climb</InputLabel>
                    <Select
                        value={climb}
                        label="Climb"
                        onChange={handleClimb}>
                        <MenuItem value={0}></MenuItem>
                        <MenuItem value={1}>Deep Climb</MenuItem>
                        <MenuItem value={2}>Shallow Climb</MenuItem>
                        <MenuItem value={3}>Both Shallow and Deep Climb</MenuItem>
                        <MenuItem value={4}>No Climb</MenuItem>
                    </Select>
                </FormControl>
                {/* <TextField
                    label="Robot Features"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    value={robotFeatures}
                    onChange={handleRobotFeaturesChange}
                /> */}
               
                {/* <TextField
                    aria-label="Battery Number"
                    placeholder="0"
                    type="number"
                    fullWidth
                    margin="normal"
                    min={0}
                    value={batteryNumber}
                    onChange={handleBatteryNumber}
                /> */}
                <Button
                    sx={{ backgroundColor: "#ff9800", color: "white", '&:hover': { backgroundColor: "#e65100" } }}
                    fullWidth
                    variant='contained'
                    onClick={handleSubmit}>
                    Submit Pit Scout
                </Button>
            </Stack>
        </Container>
    );
};

export default PitScout;
