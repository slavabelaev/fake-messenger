import React from "react";
import {ListItem, ListItemIconProps, ListItemProps, ListItemTextProps} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export interface MenuListItemProps {
    dense?: ListItemProps['dense'];
    primary?: ListItemTextProps['primary'];
    secondary?: ListItemTextProps['secondary'];
    onClick?: VoidFunction;
    icon?: ListItemIconProps['children'];
}

function MenuListItem(props: MenuListItemProps) {
    const listItemIcon = props.icon && (
        <ListItemIcon>
            {props.icon}
        </ListItemIcon>
    );

    return (
        <ListItem
            dense={props.dense}
            button
            onClick={props.onClick}
        >
            {listItemIcon}
            <ListItemText
                primary={props.primary}
                secondary={props.secondary}
            />
        </ListItem>
    )
}

export default MenuListItem;