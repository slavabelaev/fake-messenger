import React from 'react';
import SettingList from "../../settings/SettingList";
import View from "../../../common/components/layout/View";
import LayoutToolbar from "../../../common/components/layout/LayoutToolbar";

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
