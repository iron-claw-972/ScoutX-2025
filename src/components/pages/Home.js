import React, { useState, useEffect } from "react";
import { Box, Divider, Stack, Typography, Grid } from "@mui/material";
import { Constants } from "../../Constants";

export default function Home() {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "90vh",
            width: "100vw", // Critical: Prevent any overflow from Box itself
            overflowX: "hidden", // Redundant but safe
            boxSizing: "border-box", 
          }}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >   
                <Stack direction="column" alignItems="center" spacing={4}>
                    <Typography
                        variant="h3"
                        sx={{
                            backgroundImage: 'linear-gradient(to right, #FFA500, #FF4500)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            WebkitBackgroundClip: 'text',
                        }}
                    >
                        972 Scouting
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ height: '100%' }}>                {renderScoutBox('Pit Scout', '/pitscout', Constants.pitScout)}
                        {renderScoutBox('HP Scout', '/humanplayerscout', Constants.humanPlayer)}
                        {renderScoutBox('Match Scout', '/matchscout', Constants.matchScout)}
                        {renderScoutBox('Data Visualization', '/DataVisualizationDisplay', Constants.dataAnalytics)}
                        {renderScoutBox('Credits', '/credits', Constants.credits)}
                    </Stack>
                </Stack>
                <Box height={50}/>
            </Grid>
        </Box>
    );
}

function renderScoutBox(title, path, image) {
    return (
        <Stack direction={'column'} width={150}>
            <Box height={150}>
                <Box
                    borderRadius={8}
                    draggable={"false"}
                    component={"img"}
                    src={image}
                    sx={{ 
                        py: 1, 
                        width: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        cursor: 'pointer',
                        borderWidth: '2px',
                        borderColor: 'white'
                    }}
                    onClick={() => { window.location.pathname = path; }}
                ></Box>
            </Box>

            <Box
                sx={{ py: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => { window.location.pathname = path; }}
            >
                <Typography variant="h6.5" sx={{ mb: 0 }}>{title}</Typography>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 0.5 }}>
                <Divider sx={{ width: '45px', backgroundColor: 'grey.800', height: '2px' }} />
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
