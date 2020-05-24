import {createMuiTheme} from "@material-ui/core";
import {red, grey} from "@material-ui/core/colors";

export const LIGHT_THEME = createMuiTheme({
    palette: {
        type: 'light',
        primary: red,
        secondary: grey
    },
    overrides: {
    }
});

export const DARK_THEME = createMuiTheme({
    palette: {
        type: 'dark'
    }
});
