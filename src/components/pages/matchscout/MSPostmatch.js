import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { MatchStage } from "../../MatchConstants";
import CustomInput from "./form_elements/CustomInput";
import { Box, Typography, Stack, Grid } from "@mui/material";
import CustomToggleButton from "./form_elements/CustomToggleButton";

export default function MSPostmatch(props) {
    const [data, _] = useState(props.data);
    const [counter, setCounter] = useState(0);

    const onChange = props.onChange;

    const update = () => {
        setCounter(counter + 1);
    };

    return (
        <>
            <Grid2 container spacing={3}>
                <CustomInput
                    required={false}
                    label={"Extra Comments"}
                    helperText={
                        "Anything else you would like to add? For example, what were some potential sources of error?"
                    }
                    type={"text"}
                    multiline={true}
                    fullWidth={true}
                    value={data.get(MatchStage.POST_MATCH, "comments")}
                    onChange={(newValue) => {
                        data.set(MatchStage.POST_MATCH, "comments", newValue);
                        update();
                    }}
                />

                <Typography variant={"h6"}>Check All That Apply</Typography>

{/* Wrap CustomToggleButtons in Grid2 */}
<Grid2 container spacing={1}> {/* Reduced spacing between rows */}
    {/* General Group */}
    <Grid2 xs={12}>
        <Typography variant={"h5"}>General</Typography>
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Played Defense 🛡️"}
            value={data.getPostData("playedMajorityDefense")}
            onClick={(newValue) => {
                data.setPostData("playedMajorityDefense", newValue);
                update();
            }}
            showCheckbox={false}
            style={{
                height: '50px'
            }}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Touch It Own It Intake 🤲"}
            value={data.getPostData("touchItOwnIt")}
            onClick={(newValue) => {
                data.setPostData("touchItOwnIt", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"A-stopped 🛑"}
            value={data.getPostData("aStopped")}
            onClick={(newValue) => {
                data.setPostData("aStopped", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"E-stopped 🚨"}
            value={data.getPostData("eStopped")}
            onClick={(newValue) => {
                data.setPostData("eStopped", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>

    {/* Flaws Group */}
    <Grid2 xs={12}>
        <Typography variant={"h6"}>Flaws</Typography>
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Consistently Browns Out ⚡"}
            value={data.getPostData("brownsOut")}
            onClick={(newValue) => {
                data.setPostData("brownsOut", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Tips Over / Very Wobbly 🤸‍♂️"}
            value={data.getPostData("wobbly")}
            onClick={(newValue) => {
                data.setPostData("wobbly", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Consistently Misses Outtakes ❌"}
            value={data.getPostData("missesOuttakesConsistently")}
            onClick={(newValue) => {
                data.setPostData("missesOuttakesConsistently", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Slow Intakes 🐢"}
            value={data.getPostData("slowIntakes")}
            onClick={(newValue) => {
                data.setPostData("slowIntakes", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Was Disabled 🚫"}
            value={data.getPostData("disabled")}
            onClick={(newValue) => {
                data.setPostData("disabled", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Good Defense From Opponents 🛡️"}
            value={data.getPostData("goodDefenseFromOpponents")}
            onClick={(newValue) => {
                data.setPostData("goodDefenseFromOpponents", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Knocked Cage 🪤"}
            value={data.getPostData("knockedCage")}
            onClick={(newValue) => {
                data.setPostData("knockedCage", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Failed Climb 🧗"}
            value={data.getPostData("failedClimb")}
            onClick={(newValue) => {
                data.setPostData("failedClimb", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>

    {/* Broken Parts Group */}
    <Grid2 xs={12}>
        <Typography variant={"h6"}>Broken Parts</Typography>
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Intake Broken 🤖"}
            value={data.getPostData("intakeBroken")}
            onClick={(newValue) => {
                data.setPostData("intakeBroken", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Outtake Broken ⚙️"}
            value={data.getPostData("outtakeBroken")}
            onClick={(newValue) => {
                data.setPostData("outtakeBroken", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Elevator Broken 🏗️"}
            value={data.getPostData("elevatorBroken")}
            onClick={(newValue) => {
                data.setPostData("elevatorBroken", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
    <Grid2 xs={6}>
        <CustomToggleButton
            label={"Arm Broken 🦾"}
            value={data.getPostData("armBroken")}
            onClick={(newValue) => {
                data.setPostData("armBroken", newValue);
                update();
            }}
            showCheckbox={false}
        />
    </Grid2>
</Grid2>

            </Grid2>
            <Box sx={{ mt: 3 }} />
        </>
    );
}