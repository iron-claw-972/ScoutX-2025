import Grid2 from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { MatchStage } from "../../MatchConstants";
import CustomInput from "./form_elements/CustomInput";
import { Box, Typography, Stack } from "@mui/material";
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
                        "Anything else you would like to add? For example, did the robot break down (and for how long!), or did the drive team do something exceptional?"
                    }
                    type={"text"}
                    multiline={true}
                    value={data.get(MatchStage.POST_MATCH, "comments")}
                    onChange={(newValue) => {
                        data.set(MatchStage.POST_MATCH, "comments", newValue);
                        update();
                    }}
                />

                <CustomInput
                    label={"Comments on Defense"}
                    helperText={
                        "If this team played defense, how did they do? Describe in great detail."
                    }
                    type={"text"}
                    multiline={true}
                    fullWidth={true}
                    value={data.get(MatchStage.POST_MATCH, "defense")}
                    onChange={(newValue) => {
                        data.set(MatchStage.POST_MATCH, "defense", newValue);
                        update();
                    }}
                />
                <Typography variant={"h6"}>
                    Check All That Apply
                </Typography>

                {/* Wrap CustomToggleButtons in Grid2 */}
                <Grid2 container spacing={2}>
                    <Grid2 xs={6}>
                        <CustomToggleButton
                            label={"Intake Broken"}
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
                            label={"Outtake Broken"}
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
                            label={"Elevator Broken"}
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
                            label={"Arm Broken"}
                            value={data.getPostData("armBroken")}
                            onClick={(newValue) => {
                                data.setPostData("armBroken", newValue);
                                update();
                            }}
                            showCheckbox={false}
                        />
                    </Grid2>

                    <Grid2 xs={6}>
                        <CustomToggleButton
                            label={"Consistently Browns Out"}
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
                            label={"Tips Over / Very Wobbly"}
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
                            label={"Consistently Misses Outtakes"}
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
                            label={"Slow Intakes"}
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
                            label={"Was Disabled"}
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
                            label={"Good Defense From Opponents"}
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
                            label={"Played Defense"}
                            value={data.getPostData("playedMajorityDefense")}
                            onClick={(newValue) => {
                                data.setPostData("playedMajorityDefense", newValue);
                                update();
                            }}
                            showCheckbox={false}
                        />
                    </Grid2>

                    {/* Add the new CustomToggleButton */}
                    <Grid2 xs={6}>
                        <CustomToggleButton
                            label={"Touch It Own It Intake"}
                            value={data.getPostData("touchItOwnIt")}
                            onClick={(newValue) => {
                                data.setPostData("touchItOwnIt", newValue); // Fixed syntax error here
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