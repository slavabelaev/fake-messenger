import React from "react";
import {ListItem, ListItemIconProps, ListItemProps, ListItemTextProps} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export type MenuListItemProps = {
    primary?: ListItemTextProps['primary'];
    secondary?: ListItemTextProps['secondary'];
    icon?: ListItemIconProps['children'];
    button?: ListItemProps['button'];
    selected?: ListItemProps['selected'];
    disabled?: ListItemProps['disabled'];
    dense?: ListItemProps['dense'];
    onClick?: VoidFunction;
}

function MenuListItem({
    icon,
    primary,
    secondary,
    selected,
    disabled,
    dense,
    onClick

}: MenuListItemProps) {
    const listItemIcon = icon && (
        <ListItemIcon>
            {icon}
        </ListItemIcon>
    );

    return (
        <ListItem
            button
            selected={selected}
            disabled={disabled}
            dense={dense}
            onClick={onClick}
        >
            {listItemIcon}
            <ListItemText
                primary={primary}
                secondary={secondary}
            />
        </ListItem>
    )
}

export default MenuListItem;