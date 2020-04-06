import React from "react";
import {ListItem, ListItemIconProps, ListItemProps, ListItemTextProps} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

export type MenuListItemProps = Omit<ListItemProps, 'children' | 'button'> & {
    primary?: ListItemTextProps['primary'];
    secondary?: ListItemTextProps['secondary'];
    icon?: ListItemIconProps['children'];
    button?: ListItemProps['button'];
}

function MenuListItem({
    icon,
    primary,
    secondary,
    button,
    ...otherProps

}: MenuListItemProps) {
    const listItemIcon = icon && (
        <ListItemIcon>
            {icon}
        </ListItemIcon>
    );

    return (
        // @ts-ignore
        <ListItem
            button
            {...otherProps}
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