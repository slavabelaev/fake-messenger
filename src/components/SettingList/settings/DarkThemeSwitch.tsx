import React from 'react';
import ListItemSwitch from "../../ListItemSwitch";
import {useDispatch, useSelector} from "react-redux";
import {selectSettings, enableDarkTheme} from "../../../store/settingsSlice";

function DarkThemeSwitch() {
    const {darkThemeEnabled} = useSelector(selectSettings);
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
