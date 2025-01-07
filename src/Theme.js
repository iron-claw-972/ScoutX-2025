import {lightGreen, orange, red, yellow} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",

        primary: orange,
        secondary: yellow,

        white: {main: '#ffffff',},

        success: lightGreen,
        error: red,
        unselected: {main: '#f8b051',}
    },

    // typography: {
    //     fontSize: 25,
    //
    //     h1: {
    //         fontSize: 30,
    //         fontWeight: 400,
    //     },
    // }
});