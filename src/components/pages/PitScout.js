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
    Box,
    Collapse,
    Alert,
    IconButton
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import {doc, getFirestore, setDoc} from 'firebase/firestore';
import { Constants } from '../../Constants';


const PitScout = (props) => {
    const [teamNumber, setTeamNumber] = useState("");
    const [drivetrain, setDrivetrain] = useState("");
    const [intake, setIntake] = useState("");
    const [climb, setClimb] = useState("");
    const [robotType, setRobotType] = useState("");
    const [extraNotes, setExtraNotes] = useState("");
    const [alert, setAlert] = useState({open: false, message: "", severity: "success"}); 

    const handleTeamNumberChange = (event) => {
        setTeamNumber(event.target.value);
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

    const handleSubmit = async () => {
        if (!teamNumber.trim()) {
            setAlert({open: true, message: "Submit Team Number", severity: "error"})
            return;
        } else {
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
        }
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
                {/* Alert is now controlled by React state */}
                <Box sx={{ width:"100%" }}>
                    <Collapse in={alert.open}>
                    <Alert
                        sx={{ mb: 0, mt: 2 }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => setAlert({ ...alert, open: false })}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        severity={alert.severity}
                    >
                        {alert.message}
                    </Alert>
                    </Collapse>
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
                        <ListItemIcon>
                                <img
                                    src={Constants.tankDrive}
                                    alt="Tank"
                                    style={{ width: 100, height: 80 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Tank" />
                        </MenuItem>
                        <MenuItem value={"Swerve"}>
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
                        <MenuItem value={"WCP Competitive Concept"}>
                        <ListItemIcon>
                                <img
                                    src={Constants.WCPBot}
                                    alt="WCP Competitive Concept"
                                    style={{ width: 70, height: 80 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="WCP Competitive Concept" />
                        </MenuItem>
                        <MenuItem value={"Everybot"}>Everybot</MenuItem>
                        <MenuItem value={"Kit Bot"}>
                        <ListItemIcon>
                                <img
                                    src={Constants.kitBot}
                                    alt="Kit Bot"
                                    style={{ width: 70, height: 80 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Kit Bot" />
                        </MenuItem>
                        <MenuItem value={"Cranberry Alarm Bot"}>
                        <ListItemIcon>
                                <img
                                    src={Constants.cranberryAlarmBot}
                                    alt="Cranberry Alarm Bot"
                                    style={{ width: 70, height: 80 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Cranberry Alarm Bot" />
                        </MenuItem>
                        <MenuItem value={"111 FRC Bot"}>
                        <ListItemIcon>
                                <img
                                    src={Constants.oneoneonefrc}
                                    alt="111 FRC Bot"
                                    style={{ width: 70, height: 80 }}
                                />
                            </ListItemIcon>
                            <ListItemText primary=" 111 FRC Bot" />
                        </MenuItem>
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
