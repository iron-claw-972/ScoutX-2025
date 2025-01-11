import Grid2 from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import {MatchStage} from "../../MatchConstants";
import CustomInput from "./form_elements/CustomInput";
import {Box, Typography, Stack} from "@mui/material";
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
                <Stack direction={"row"} spacing={0.5}> 
                    {/* <CustomToggleButton
                        label={"Intake Broken"}
                        value={data.getPostMData("intakeBroken")}
                        onClick={(newValue) => {
                            data.setPostMData("intakeBroken", newValue);
                            update();
                    }}
                    showCheckbox={false}
                    /> */}
                </Stack>
            </Grid2>
            <Box sx={{
                mt: 3,
            }}/>
        </>
    );
}