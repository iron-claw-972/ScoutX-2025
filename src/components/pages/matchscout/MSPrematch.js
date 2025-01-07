import {Scouters} from "../../Scouters";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import {CageLocation, MatchStage, StartPosition} from "../../MatchConstants";
import CustomAutocomplete from "./form_elements/CustomAutocomplete";

import CustomInput from "./form_elements/CustomInput";
import {Box, Button} from "@mui/material";
import {useCookies} from "react-cookie";

export default function MSPrematch(props) {
    const [cookies, setCookie] = useCookies();

    const [data, _] = useState(props.data);
    const [counter, setCounter] = useState(0);

    const update = () => {
        setCounter(counter + 1);
    };

    return (
        <>
            <Grid2 container spacing={3}>
                <CustomAutocomplete
                    small
                    label={"Name"}
                    options={Scouters}
                    value={cookies.name || ""}
                    onChange={(newValue) => {
                        setCookie('name', newValue);
                        data.set(MatchStage.PRE_MATCH, "name", newValue);
                        update();
                    }}
                />
                <CustomInput
                    small
                    required
                    label={"Team"}
                    type={"number"}
                    multiline={false}
                    value={data.get(MatchStage.PRE_MATCH, "team")}
                    onChange={(newValue) => {
                        data.set(MatchStage.PRE_MATCH, "team", newValue);
                        update();
                    }}
                />
                <CustomInput
                    small
                    required
                    label={"Match Number"}
                    type={"number"}
                    multiline={false}
                    value={data.get(MatchStage.PRE_MATCH, "match")}
                    onChange={(newValue) => {
                        data.set(MatchStage.PRE_MATCH, "match", newValue);
                        update();
                    }}
                />
                <CustomAutocomplete
                    small
                    label={"Alliance"}
                    options={["BLUE", "RED"]}
                    value={data.get(MatchStage.PRE_MATCH, "alliance")}
                    onChange={(newValue) => {
                        data.set(MatchStage.PRE_MATCH, "alliance", newValue);
                        update();
                    }}
                />
                <CustomAutocomplete
                    small
                    label={"Cage Location"}
                    options={Object.keys(CageLocation)}
                    value={data.get(MatchStage.PRE_MATCH, "cage_location")}
                    onChange={(newValue) => {
                        data.set(MatchStage.PRE_MATCH, "cage_location", newValue);
                        update();
                    }}
                />
                <CustomAutocomplete
                    small
                    label={"Start Position"}
                    options={Object.keys(StartPosition)}
                    value={data.get(MatchStage.PRE_MATCH, "start_position")}
                    onChange={(newValue) => {
                        data.set(MatchStage.PRE_MATCH, "start_position", newValue);
                        update();
                    }}
                />
            </Grid2>
            <Box sx={{
                my: 4
            }}/>
            <Button fullWidth color={"secondary"} variant={"outlined"}>
                Skip
            </Button>
        </>
    );
}
