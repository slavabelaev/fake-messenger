import React from 'react';
import SettingList from "../../components/SettingList/SettingList";
import View from "../../layout/View";
import LayoutToolbar from "../../layout/LayoutToolbar";
import BackButton from "../../layout/BackButton";

export interface SettingsProps {}

function Settings(props: SettingsProps) {
    const toolbar = (
        <LayoutToolbar
            title="Settings"
        />
    );

    return (
        <View
            toolbar={toolbar}
        >
            <SettingList/>
        </View>
    )
}

export default Settings;
