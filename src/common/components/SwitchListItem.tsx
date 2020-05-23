import React from 'react';
import {ListItem, ListItemTextProps, SwitchProps} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";

export type ListItemSwitchProps = Omit<SwitchProps, 'onChange'> & {
    primary?: ListItemTextProps['primary'];
    secondary?: ListItemTextProps['secondary'];
    checked: boolean;
    onChange?: (checked: boolean) => void;
}

function SwitchListItem({
    primary,
    secondary,
    onChange,
    checked,
    ...switchProps
}: ListItemSwitchProps) {
    return (
        <ListItem
            button
            onClick={() => onChange && onChange(!checked)}
        >
            <ListItemText
                primary={primary}
                secondary={secondary}
            />
            <ListItemSecondaryAction>
                <Switch
                    checked={checked}
                    onChange={(event, checked) => onChange && onChange(checked)}
                    {...switchProps}
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default SwitchListItem;
