import Grid2 from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import {MatchStage} from "../../MatchConstants";
import Undo from "./form_elements/Undo";
import CustomInput from "./form_elements/CustomInput";
import {Box} from "@mui/material";

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
            </Grid2>
            <Box sx={{
                mt: 3,
            }}/>
            <Undo data={data} update={() => update()}/>
        </>
    );
}
