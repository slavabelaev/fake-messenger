import React from 'react';
import {ListItem, ListItemTextProps} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export interface SettingListItemProps {
    primary: ListItemTextProps['primary'];
    secondary?: ListItemTextProps['secondary'];
}

function SettingListItem(props: SettingListItemProps) {
    return (
        <ListItem>
            <ListItemText
                primary={props.primary}
                secondary={props.secondary}
            />
            <ListItemSecondaryAction>
                <Switch/>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default SettingListItem;
