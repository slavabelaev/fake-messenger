import React from 'react';
import SwitchListItem from "../../common/components/SwitchListItem";
import {useDispatch, useSelector} from "react-redux";
import {selectSettings, enableDarkTheme} from "./settingsSlice";

function DarkThemeSwitch() {
    const {darkThemeEnabled} = useSelector(selectSettings);
    const dispatch = useDispatch();
    const handleChange = (checked: boolean) => dispatch(enableDarkTheme(checked));

    return (
        <SwitchListItem
            primary="Dark theme"
            checked={darkThemeEnabled}
            onChange={handleChange}
        />
    );
}

export default DarkThemeSwitch;
