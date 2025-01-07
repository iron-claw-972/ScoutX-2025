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
    Typography
} from '@mui/material';
import SmallNumberCounter from "./matchscout/form_elements/SmallNumberCounter";
import CustomInput from "./matchscout/form_elements/CustomInput";
import {doc, getFirestore, setDoc} from 'firebase/firestore';


const PitScout = (props) => {
    const [teamNumber, setTeamNumber] = useState('');
    const [robotFeatures, setRobotFeatures] = useState('');
    const [drivetrain, setDrivetrain] = useState("");
    const [intake, setIntake] = useState("");
    const [outtake, setOuttake] = useState("");
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

    const handleOuttake = (event) => {
        setOuttake(event.target.value);
    };

    const handleRobotType = (event) => {
        setRobotType(event.target.value)
    }

    const handleUnderstage = () => {
        if (understage) {
            setUnderstage(false);
        } else {
            setUnderstage(true);
        }
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
            outtake: outtake,
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
                        <MenuItem value={1}>Tank</MenuItem>
                        <MenuItem value={2}>Swerve</MenuItem>
                        <MenuItem value={3}>H-Drive</MenuItem>
                        <MenuItem value={4}>Mecanum</MenuItem>
                        <MenuItem value={5}>Slide</MenuItem>
                        <MenuItem value={6}>Other</MenuItem>
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
                        <MenuItem value={1}>WCP Competitive Concept</MenuItem>
                        <MenuItem value={2}>Everybot</MenuItem>
                        <MenuItem value={3}>Kitbot</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Intake"
                    variant="outlined"
                    multiline
                    rows={1}
                    value={intake}
                    onChange={handleIntake}
                />
                <FormControl fullWidth>
                    <TextField
                        label="Outtake"
                        variant="outlined"
                        multiline
                        rows={1}
                        value={outtake}
                        onChange={handleOuttake}
                    />
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
                <Button
                    fullWidth
                    variant={understage ? "contained" : "outlined"}
                    color={understage ? "primary" : "white"}
                    onClick={() => {
                        handleUnderstage();
                    }}
                >
                    Goes Under Stage?
                </Button>
                <SmallNumberCounter
                    label={"Battery Number"}
                    value={batteryNumber}
                    onChange={(newValue) => {
                        handleBatteryNumber(newValue)
                    }}
                />
                <CustomInput
                    required={false}
                    label={"Extra Comments"}
                    helperText={
                        "Anything else you would like to add? For example, how solid did their robot look?"
                    }
                    type={"text"}
                    multiline={true}
                    onChange={(newValue) => {
                        handleExtraNotes(newValue)
                    }}
                />
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
                    color={"success"}
                    variant={"outlined"}
                    fullWidth
                    onClick={handleSubmit}>
                    Submit Pit Scout
                </Button>
            </Stack>
        </Container>
    );
};

export default PitScout;
