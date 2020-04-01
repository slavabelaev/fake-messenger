import React from 'react';
import ListItemSwitch from "../../ListItemSwitch";
import {useDispatch, useSelector} from "react-redux";
import {settingsSelector, enableDarkTheme} from "../settingsSlice";

function DarkThemeSwitch() {
    const {darkThemeEnabled} = useSelector(settingsSelector);
    const dispatch = useDispatch();
    const handleChange = (checked: boolean) => dispatch(enableDarkTheme(checked));

    return (
        <ListItemSwitch
            primary="Dark theme"
            checked={darkThemeEnabled}
            onChange={handleChange}
        />
    );
}

export default DarkThemeSwitch;
