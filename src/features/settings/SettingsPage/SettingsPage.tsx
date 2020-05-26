import React from 'react';
import SettingList from "../SettingList";
import View from "../../../common/components/layout/View";
import LayoutToolbar from "../../../common/components/layout/LayoutToolbar";

export interface SettingsProps {}

function SettingsPage(props: SettingsProps) {
    const toolbar = (
        <LayoutToolbar
            title="SettingsPage"
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

export default SettingsPage;
