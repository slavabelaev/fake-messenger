import React from 'react';
import {Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack} from "@material-ui/icons";
import SettingList from "../../components/SettingList/SettingList";
import {useHistory} from 'react-router-dom';
import Tooltip from "@material-ui/core/Tooltip";
import View from "../../layout/View";

export interface SettingsProps {}

function Settings(props: SettingsProps) {
    const history = useHistory();

    const toolbar = (
        <Toolbar>
            <Tooltip title="Back">
                <IconButton
                    edge="start"
                    onClick={history.goBack}
                >
                    <ArrowBack/>
                </IconButton>
            </Tooltip>
            <Typography>
                Settings
            </Typography>
        </Toolbar>
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
