import React from 'react';
import ListItemText, {ListItemTextProps} from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

export interface DetailListItemProps {
    primary?: ListItemTextProps['primary'];
    secondary?: ListItemTextProps['secondary'];
}

function DetailListItem(props: DetailListItemProps) {
    return (
        <ListItem>
            <ListItemText
                primary={props.primary}
                secondary={props.secondary}
            />
        </ListItem>
    );
}

export default DetailListItem;
