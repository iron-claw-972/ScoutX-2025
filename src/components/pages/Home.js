import React from "react";
import { Box, Stack, Typography, Button, useMediaQuery } from "@mui/material";
import { Constants } from "../../Constants";
import bgImage from "../../assets/backGround.png";

export default function Home() {
    const isSmallScreen = useMediaQuery("(max-width: 960px)");

    return (
        <Box sx={{
            position: "fixed",
            mt: -5,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden", 
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            width: "100vw",
            boxSizing: "border-box", 
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover", 
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            
            {/* Title */}
            <Typography
                variant={isSmallScreen ? "h4" : "h1"}
                gutterBottom
                sx={{
                    position: "absolute",
                    top: 60,
                    left: 200,
                    textAlign: "left",
                    display: "inline-block", 
                    color: "white", 
                    fontFamily: '"Noto Sans", sans-serif',
                }}
            >
                Scout
                <Box
                    component="span"
                    sx={{
                        backgroundImage: 'linear-gradient(to right, #FFA500, #FF4500)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        WebkitBackgroundClip: 'text',
                        display: "inline-block",
                        verticalAlign: "top", 
                        pl: 2,
                        pt: .20,
                    }}
                >
                    X
                </Box>
            </Typography>

            
            <Typography
                variant={isSmallScreen ? "h5" : "h3"}
                sx={{
                    position: "absolute",
                    top: 180,
                    left: 200,
                    textAlign: "left",
                    display: "inline-block", 
                    color: "white", 
                    fontFamily: '"Noto Sans", sans-serif',
                }}
            >
                Collection. Visualization. Analysis.
            </Typography>
            <Typography
                variant={isSmallScreen ? "h5" : "h5"}
                sx={{
                    position: "absolute",
                    top: 260,
                    left: 205,
                    textAlign: "left",
                    display: "inline-block", 
                    color: "grey", 
                    fontFamily: '"Noto Sans", sans-serif',
                }}
            >
                Developed by Iron Claw 972
            </Typography>


          
            <Stack direction="row" spacing={2} sx={{ position: "absolute",
                    top: 320,
                    left: 200,
                    mt: 4 }}>
                {renderScoutButton('/pitscout', "Pit Scout", isSmallScreen)}
                {renderScoutButton('/matchscout', "Match Scout", isSmallScreen)}
                {renderScoutButton('/humanplayerscout', "Human Player", isSmallScreen)}
                {renderScoutButton('/DataVisualizationDisplay', "Data Analytics", isSmallScreen)}
                {renderScoutButton('/credits', "Credits", isSmallScreen)}
            </Stack>
        </Box>
    );
}

/* Renders an MUI Button instead of Grid */
function renderScoutButton(path, label, isSmallScreen) {
    return (
        <Button
            variant="contained"
            sx={{
                backgroundColor: "#FF9800",
                color: "white",
                borderRadius: "8px",
                px: 4, 
                py: 2,
                fontSize: isSmallScreen ? "0.9rem" : "1.1rem",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": { backgroundColor: "#e65100" }
            }}
            onClick={() => { window.location.pathname = path; }}
        >
            {label}
        </Button>
    );
}
