import {Alert, Button, Collapse, Divider, IconButton, Stack, Typography,} from "@mui/material";
import Page from "../Page";
import {useEffect, useMemo, useState} from "react";
import MatchScoutData from "../MatchScoutData";
import {MatchStage} from "../MatchConstants";
import MSAuto from "./matchscout/MSAuto";
import MSPrematch from "./matchscout/MSPrematch";
import MSPostmatch from "./matchscout/MSPostmatch";
import MSTeleop from "./matchscout/MSTeleop";
import CloseIcon from "@mui/icons-material/Close";
import {useCookies} from "react-cookie";

export default function MatchScout() {

    const [counter, setCounter] = useState(0);
    const update = () => {
        setCounter(counter + 1);
    };

    let data = useMemo(() => new MatchScoutData(), []);

    const [currentComponent, setCurrentComponent] = useState(
        <MSPrematch data={data}/>
    );

    useEffect(() => {
        // eslint-disable-next-line default-case
        switch (data.stage) {
            case MatchStage.PRE_MATCH:
                setCurrentComponent(<MSPrematch data={data}/>);
                break;
            case MatchStage.AUTO:
                setCurrentComponent(<MSAuto data={data}/>);
                break;
            case MatchStage.TELEOP:
                setCurrentComponent(<MSTeleop data={data}/>);
                break;
            case MatchStage.POST_MATCH:
                setCurrentComponent(<MSPostmatch data={data}/>);
                break;
        }
    }, [counter]);

    return (
        <Page>
            <Typography color={"white"} variant={"h3"}>
                Match Scout
            </Typography>
            <Typography variant={"h5"}>
                {Object.keys(MatchStage)[data.stage].replace("_", " ")}
            </Typography>
            <Divider
                sx={{
                    my: 1.5,
                }}
            />
            <Collapse in={data.alert.open}>
                <Alert
                    sx={{
                        mb: 3,
                    }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                data.alert.open = false;
                                update();
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                    severity={data.alert.severity}
                >
                    {data.alert.message}
                </Alert>
            </Collapse>
            {currentComponent}
            <Stack
                direction={"row"}
                spacing={2}
                sx={{
                    my: 2,
                }}
            >
                {data.stage !== MatchStage.PRE_MATCH && (
                    <Button
                        fullWidth
                        variant={"outlined"}
                        onClick={() => {
                            data.stage--;
                            update();
                        }}
                    >
                        Previous
                    </Button>
                )}
                {data.stage !== MatchStage.POST_MATCH && (
                    <Button
                        fullWidth
                        variant={"outlined"}
                        onClick={() => {
                            if (data.validate().valid) {
                                data.stage++;
                            }
                            update();
                        }}
                    >
                        Next
                    </Button>
                )}
                {data.stage === MatchStage.POST_MATCH && (
                    <Button
                        fullWidth
                        color={"success"}
                        variant={"outlined"}
                        onClick={() => {
                            data.submit();
                            update();
                        }}
                    >
                        Submit
                    </Button>
                )}
            </Stack>
        </Page>
    );
}
