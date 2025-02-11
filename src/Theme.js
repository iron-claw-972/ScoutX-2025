import {lightGreen, orange, red, yellow} from "@mui/material/colors";
import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        background: {default: "#000000"},
        mode: "dark",

        primary: orange,
        secondary: yellow,
        blue: {main: '#03628f'},

        white: {main: '#ffffff',},
        red: red,
        grey: {main: '#545453'},

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