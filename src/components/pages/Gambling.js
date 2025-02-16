import React, { useState } from 'react';
import { Avatar, Button, Card, CardContent, Grid, Stack, Typography, Box } from '@mui/material';
import { Casino } from '@mui/icons-material';
import Page from "../Page";
import { Constants } from "../../Constants";

const symbols = ["🍒", "🍋", "🍊", "💎", "7️⃣"];

const Gambling = () => {
    const [reel1, setReel1] = useState("");
    const [reel2, setReel2] = useState("");
    const [reel3, setReel3] = useState("");
    const [message, setMessage] = useState("Spin the reels to play!");
    const [allowSpin, setAllowSpin] = useState(true);  

    const spin = () => {
        if (!allowSpin) return;  

        setAllowSpin(false);  

        const randomSymbol1 = symbols[Math.floor(Math.random() * symbols.length)];
        const randomSymbol2 = symbols[Math.floor(Math.random() * symbols.length)];
        const randomSymbol3 = symbols[Math.floor(Math.random() * symbols.length)];

        setReel1(randomSymbol1);
        setReel2(randomSymbol2);
        setReel3(randomSymbol3);

        if (randomSymbol1 === randomSymbol2 && randomSymbol2 === randomSymbol3) {
            setMessage("🎉 Jackpot! You won! 🎉");
        } else if (randomSymbol1 === randomSymbol2 || randomSymbol2 === randomSymbol3 || randomSymbol1 === randomSymbol3) {
            setMessage("So close! You got a small prize.");
        } else {
            setMessage("Better luck next time!");
        }
    };

    return (
        <Box alignItems="center">
            <Stack spacing={3} alignItems="center" sx={{ padding: 3 }}>
                <Typography variant="h2" color="primary" gutterBottom>
                    Slot Machine Game
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center">
                    Press "Spin" to play and test your luck!
                </Typography>

                {/* Slot Machine Display */}
                <Card raised sx={{ maxWidth: 300, textAlign: 'center' }}>
                    <CardContent>
                        <Typography variant="h3">{reel1} {reel2} {reel3}</Typography>
                        <Typography variant="body1" color="text.secondary" mt={1}>
                            {message}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<Casino />}
                            onClick={spin}
                            sx={{ mt: 2 }}
                            disabled={!allowSpin}  
                        >
                            Spin
                        </Button>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    );
};

export default Gambling;
