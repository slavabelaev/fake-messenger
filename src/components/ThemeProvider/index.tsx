import React, {PropsWithChildren} from "react";
import {LIGHT_THEME, DARK_THEME} from "./theme";
import {MuiThemeProvider} from "@material-ui/core";
import {useSelector} from "react-redux";
import {settingsSelector} from "../SettingList/settingsSlice";

function ThemeProvider(props: PropsWithChildren<{}>) {
    const {darkThemeEnabled} = useSelector(settingsSelector);
    return (
        <MuiThemeProvider theme={darkThemeEnabled ? DARK_THEME : LIGHT_THEME}>
            {props.children}
        </MuiThemeProvider>
    )
}

export default ThemeProvider;
