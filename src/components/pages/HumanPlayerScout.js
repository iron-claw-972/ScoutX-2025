import { Button, Typography, TextField } from "@mui/material";
import Page from "../Page";
import { Stack } from "@mui/system";
import { useState } from "react";
import CustomInput from "./matchscout/form_elements/CustomInput";
import {doc, getFirestore, setDoc} from 'firebase/firestore';

const HumanPlayerScout = () => {
    const [teamNumber, setTeamNumber] = useState('');
    const [matchNumber, setMatchNumber, handleMatchNumberChange] = useState('');
    const [hits, setHits] = useState(0);
    const [misses, setMisses] = useState(0);

    // Calculate accuracy as a percentage
    const totalShots = hits + misses;
    const accuracy = totalShots > 0 ? ((hits / totalShots) * 100).toFixed(2) : 0;

    const handleTeamNumberChange = (event) => {
        setTeamNumber(event.target.value);
    };

    const handleSubmit = async () => {
        const humanPlayerData = {
           hits: hits,
           misses: misses,
        }
        const db = getFirestore();
        await setDoc(doc(db, "humanPlayerData", teamNumber),
            humanPlayerData
        );
        window.location.reload();
    };
    return (
        <Page>
            <Stack direction={"column"} spacing={4}>
                <Typography color={"white"} variant={"h4"} gutterBottom>
                    Human Player Scout
                </Typography>
                <TextField
                    label="Team Number"
                    variant="outlined"
                    value={teamNumber}
                    onChange={handleTeamNumberChange}
                />
                <TextField
                    label="Match Number"
                    variant="outlined"
                    value={matchNumber}
                    onChange={handleMatchNumberChange}
                />
                <Typography color={"white"} variant={"h5"} gutterBottom>
                    Accuracy: {accuracy}%
                </Typography>
                <Typography color={"white"} variant={"h5"} gutterBottom>
                    Shots taken: {totalShots}
                </Typography>
            
                
                <Stack direction={"row"} spacing={2} alignItems="center" justifyContent="center">
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        sx={{
                            width: "130%",
                            height: "100px",
                            fontSize: "1.5rem",
                        }}
                        onClick={() => {

                            setHits(hits + 1); 
                            console.log("Hit button clicked!");
                        }}
                    >
                        Hit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="large"
                        sx={{
                            width: "130%",
                            height: "100px",
                            fontSize: "1.5rem",
                        }}
                        onClick={() => {
                            setMisses(misses + 1); 
                            console.log("Miss button clicked!");
                        }}
                    >
                        Miss
                    </Button>

                
                </Stack>
                    <Stack 
                    direction={"row"}
                    spacing={2}>

                     <Button
                        color={"success"}
                        variant={"outlined"}
                        fullWidth
                        onClick={handleSubmit}>
                        Submit Human Player Scout
                     </Button>

                </Stack>
                  
            </Stack>
        </Page>
    );
};

export default HumanPlayerScout;
