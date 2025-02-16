import React, { useState, useEffect } from "react";
import { Box, Divider, Stack, Typography, Grid, useMediaQuery } from "@mui/material";
import { Constants } from "../../Constants";

export default function Home() {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    // Effect to update height on resize
    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Calculate dynamic margin for header (vertical spacing between header and links)
    const dynamicHeaderMargin = screenHeight > 1200 ? screenHeight * 0.017 : screenHeight * 0.007; // Adjusting 5% or 4%

    // Calculate dynamic margins for dividers in the description
    const dynamicMargin = screenHeight > 1200 ? screenHeight * 0.03 : screenHeight * 0.01;

    // Use `useMediaQuery` to determine if the screen is small
    const isSmallScreen = useMediaQuery("(max-width: 1200px)");
    
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 4,
                pb: isSmallScreen ? 14 : 0
            }}
        >
            {/* Grid for Header and Description */}
            <Grid container spacing={isSmallScreen ? 7 : 3} direction={isSmallScreen ? "column" : "row"}>
                {/* Left Side (Header and Links) */}
                <Grid item xs={12} sm={6} container direction="column" alignItems="center">
                    {/* Header */}
                    <Typography
                        component={"h3"}
                        variant={"h2"}
                        sx={{
                            mt: 2,
                            mb: dynamicHeaderMargin, // Dynamically adjusted margin-bottom
                            backgroundImage: "linear-gradient(to right, #FFA500, #FF4500)",
                            backgroundClip: "text",
                            color: "transparent",
                            WebkitBackgroundClip: "text",
                        }}
                    >
                        972 Scouting
                    </Typography>

                    {/* Links */}
                    <Stack direction={"column"} spacing={3}>
                        {Constants.pages.map((page, idx) =>
                            page.path !== "/" ? (
                                <React.Fragment key={idx}>
                                    <Box
                                        sx={{
                                            py: 2,
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            window.location.pathname = page.path;
                                        }}
                                    >
                                        <Typography variant={"h4"} sx={{ mb: 0 }}>
                                            {page.title}
                                        </Typography>
                                    </Box>

                                    {/* Add divider only if it's not the last link */}
                                    {idx < Constants.pages.length - 1 && (
                                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}>
                                            <Divider sx={{ width: "25%", backgroundColor: "grey.800" }} />
                                        </Box>
                                    )}
                                </React.Fragment>
                            ) : null
                        )}
                    </Stack>
                </Grid>

                {/* Right Side (Description) */}
                <Grid
                    item xs={12} sm={6}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ display: "flex" }}
                >
                    {/* Dynamic Divider - Top */}
                    <Divider sx={{ width: isSmallScreen ? "50%" : "25%", backgroundColor: "grey.800", mb: dynamicMargin }} />
                    <Typography
                        variant="h5"
                        sx={{
                            width: "70%",
                            textAlign: "left",
                            lineHeight: 2,
                            fontSize: "1.8rem",
                        }}
                    >
                        Welcome to Team 972's Scouting App. This platform efficiently collects and analyzes robot
                        and human player performance data. The{" "}
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
                            Match Scout
                        </Typography>{" "}
                        page tracks robot performance during matches, while the{" "}
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
                            Human Player Scout
                        </Typography>{" "}
                        page evaluates human player efficiency. The{" "}
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
                            Pit Scout
                        </Typography>{" "}
                        records essential robot specifications, and the{" "}
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
                            Data Visualization
                        </Typography>{" "}
                        page presents detailed graphs and tables along with AI-powered analytics.
                    </Typography>
                    {/* Dynamic Divider - Bottom */}
                    <Divider sx={{ width: isSmallScreen ? "50%" : "25%", backgroundColor: "grey.800", mt: dynamicMargin }} />
                </Grid>
            </Grid>
        </Box>
    );
}
