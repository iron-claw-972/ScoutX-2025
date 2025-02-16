import React from 'react';
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Constants } from "../../Constants";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Typography
        component={"h3"}
        variant={"h3"}
        sx={{
          mb: 5,
          backgroundImage: "linear-gradient(to right, #FFA500, #FF4500)", // Gradient from light orange to dark orange
          backgroundClip: "text", // Clip the background to the text
          color: "transparent", // Make the text color transparent so the gradient shows
          WebkitBackgroundClip: "text", // For webkit browsers (Safari)
        }}
      >
        972 Scouting
      </Typography>

      <Stack direction={"column"} spacing={5}>
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
                    <Divider sx={{ width: "25%", backgroundColor: 'grey.800' }} />
                </Box>
              )}
            </React.Fragment>
          ) : null
        )}
      </Stack>
    </Box>
  );
}
