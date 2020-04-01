import React from 'react';
import {List} from "@material-ui/core";
import DarkThemeSwitch from "./settings/DarkThemeSwitch";

export interface SettingListProps {}

function SettingList(props: SettingListProps) {
    return (
        <List>
            <DarkThemeSwitch/>
        </List>
    );
}

export default SettingList;
