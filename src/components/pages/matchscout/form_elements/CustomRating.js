import {Box, Stack, Typography} from "@mui/material";
import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import Slider from "@mui/material/Slider";
import SmallNumberCounter from "./IncrementCounter";

export default function CustomRating(props) {

    const onChange = props.onChange
    const value = props.value

    const title = props.title
    const description = props.description

    const label = props.label

    const min = props.min || 0
    const max = props.max || 10
    const step = props.step || 1

    return (
        <Grid2 xs={12} sm={6}>
            <Stack spacing={1} direction={"column"}>
                <Typography variant={"h4"}>{title}</Typography>
                <Typography variant={"subtitle1"}>{description}</Typography>
                <Stack direction={"column"} spacing={1}>
                    <Box sx={{
                        px: 6
                    }}>
                        <Slider
                            min={min}
                            max={max}
                            step={step}
                            marks
                            value={value}
                            onChange={(event, newValue) => {
                                onChange(newValue)
                            }}
                            aria-labelledby="slider"
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value} ${label}`}
                        />
                    </Box>
                    <SmallNumberCounter
                        label={label}
                        value={value}
                        onChange={(newValue) => {
                            onChange(newValue)
                        }}
                    />
                </Stack>
            </Stack>
        </Grid2>
    )

}