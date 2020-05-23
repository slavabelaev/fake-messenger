import {createMuiTheme} from "@material-ui/core";
import {blue, green} from "@material-ui/core/colors";

export const LIGHT_THEME = createMuiTheme({
    palette: {
        type: 'light',
        primary: blue,
        secondary: green
    },
    overrides: {
    }
});

export const DARK_THEME = createMuiTheme({
    palette: {
        type: 'dark'
    }
});
