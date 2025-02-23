import React, { useState, useEffect } from "react";
import { Box, Divider, Stack, Typography, Grid, useMediaQuery } from "@mui/material";
import { Constants } from "../../Constants";

export default function Home() {

    const isSmallScreen = useMediaQuery("(max-width: 960px)");
    const isIPadScreen = useMediaQuery("(max-width: 1400px)");

    return (
        <Box sx={{
            mt: -5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "90vh",
            width: "100vw",
            boxSizing: "border-box", 
        }}>
 <Stack direction="column" alignItems="center" spacing={isSmallScreen ? .5 : 2 }>
           <Typography
                variant={isSmallScreen ? "h4" : "h2"}
                gutterBottom
                sx={{   
                    backgroundImage: 'linear-gradient(to right, #FFA500, #FF4500)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    WebkitBackgroundClip: 'text', }}
            >
                972 Scouting
            </Typography>

         
            <Box direction="row" alignItems="center" spacing={0}>
            <Grid container justifyContent="center" columnSpacing={isSmallScreen ? 2 : 5} rowSpacing={isSmallScreen ? 1 : -1} sx={{ maxWidth: isSmallScreen ? 500 : 700 }}>
            <Grid item xs={4}>{renderScoutBox('/pitscout', Constants.pitScout, isSmallScreen)}</Grid>
    <Grid item xs={4}>{renderScoutBox('/matchscout', Constants.matchScout, isSmallScreen)}</Grid>
    <Grid item xs={4}>{renderScoutBox('/humanplayerscout', Constants.humanPlayer, isSmallScreen)}</Grid>
    <Grid item xs={4} sx={{ justifyContent: "center" }}>
        {renderScoutBox('/DataVisualizationDisplay', Constants.dataAnalytics, isSmallScreen)}</Grid>
    <Grid item xs={4} sx={{ justifyContent: "center" }}>
        {renderScoutBox('/credits', Constants.credits, isSmallScreen)}</Grid>
            </Grid>
            </Box>
            </Stack>
        </Box>
    );
}


function renderScoutBox(path, image, isSmallScreen) {
    return (
        <Stack direction={'column'} width={isSmallScreen ? 150 : "110%"}>
            <Box height={isSmallScreen ? 120 : "100%"}>
                <Box
                    borderRadius={8}
                    draggable={"false"}
                    component={"img"}
                    src={image}
                    sx={{ 
                        py: 1, 
                        width: '100%', 
                        height: '130%',
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        cursor: 'pointer',
                        borderWidth: '2px',
                        borderColor: 'white',
                        transition: 'transform 0.3s ease-in-out', 
                        '&:hover': {
                            transform: 'scale(1.1)', 
                        }
                    }}
                    onClick={() => { window.location.pathname = path; }}
                ></Box>
            </Box>

            <Box
                sx={{ py: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => { window.location.pathname = path; }}
            >
                
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 0.5 }}>
                
            </Box>
        </Stack>
    );
}

function renderGradientText(text) {
    return (
        <Typography
            component="span"
            sx={{
                backgroundImage: "linear-gradient(to right, #FFA500, #FF4500)",
                backgroundClip: "text",
                color: "transparent",
                WebkitBackgroundClip: "text",
                lineHeight: 2,
                fontSize: "1.8rem",
            }}
        >
            {text}
        </Typography>
    );
}
