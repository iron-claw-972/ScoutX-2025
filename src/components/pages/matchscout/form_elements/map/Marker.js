import {getMarkerLabel, MatchStage} from "../../../../MatchConstants";
import {Box, Tooltip} from "@mui/material";
import {theme} from "../../../../../Theme";

export default function Marker(props) {
    const id = props.id;
    const type = props.type;
    const matchStage = props.matchStage;

    const selectedIntakeLocation = props.selectedIntakeLocation;
    const setSelectedIntakeLocation = props.setSelectedIntakeLocation;
    const history = props.history;
    const confirmOuttake = props.confirmOuttake;

    const x = props.x;
    const y = props.y;

    const shouldBeOpaque = () => {
        if (selectedIntakeLocation !== -1 && type === 0) {
            return true;
        }
        if (history.includes(id) && type === 1 && matchStage === MatchStage.AUTO) {
            return false;
        }
        return selectedIntakeLocation === -1 && type === 1;
    };

    const shouldShowSelectedColor = () => {
        if (selectedIntakeLocation === 0 && type === 1) {
            return false;
        } else if (selectedIntakeLocation === id && type === 1) {
            return true;
        }
        return false;
    };

    const onClick = (event) => {
        if (type === 1) {
            if (history.includes(id) && matchStage === MatchStage.AUTO) {
                return;
            }
            if (selectedIntakeLocation === -1) {
                setSelectedIntakeLocation(id);
            }
        } 
        else {
            if (selectedIntakeLocation !== -1) {
                confirmOuttake(getMarkerLabel(matchStage, type, id));
            }
        }
    };

    return (
        <Tooltip title={getMarkerLabel(matchStage, type, id)} placement={"top"} arrow>
            <Box
                sx={{
                    width: "9%",
                    aspectRatio: "1 / 1",
                    position: "absolute",
                    top: `${y}%`,
                    left: `${x}%`,
                    transform: "translate(-50%, -50%)",
                    cursor: shouldBeOpaque() ? "pointer" : "default",

                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    backgroundColor: shouldShowSelectedColor()
                        ? theme.palette.success.dark
                        : theme.palette.secondary.dark,
                    opacity: shouldBeOpaque() ? 0.8 : 0.2,
                }}
                onClick={(event) => {
                    onClick(event);
                }}
            />
        </Tooltip>
    );
}