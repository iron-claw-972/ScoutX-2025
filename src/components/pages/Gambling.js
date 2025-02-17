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
            setMessage(`You won: ${prize}!`);
        }
    };

    return (
        <Box alignItems="center">
            <Stack spacing={3} alignItems="center" sx={{ padding: 3 }}>
                <Typography variant="h2" color="orange" gutterBottom>
                    Spin the Wheel!
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center">
                    Click "Spin" to test your luck!
                </Typography>
                <Typography variant="h6" color="warning.main">
                    Rolls Remaining: {rollsRemaining}
                </Typography>

                <Card raised sx={{ 
                    maxWidth: 1000, 
                    width: '100%',
                    textAlign: 'center', 
                    padding: 1, 
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <CardContent>
                        {wheelMounted && (
                            <Wheel
                                mustStartSpinning={mustSpin}
                                prizeNumber={prizeNumber}
                                backgroundColors={['#3e3e3e', '#fa7f05']}
                                data={prizes}
                                textColors={['#ffffff']}
                                fontFamily="Arial"
                                outerBorderColor="#000000"
                                innerBorderColor="#fa7f05"
                                onStopSpinning={handleStopSpinning}
                                spinDuration={0.8}
                            />
                        )}
                        <Typography variant="body1" color="white" mt={2}>
                            {message}
                        </Typography>
                        <Button
                            variant="contained"
                            color="warning"
                            startIcon={<Casino />}
                            onClick={spinWheel}
                            sx={{ mt: 2 }}
                            disabled={mustSpin || !wheelMounted || rollsRemaining <= 0}
                        >
                            Spin
                        </Button>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    );
};

export default WheelGame;