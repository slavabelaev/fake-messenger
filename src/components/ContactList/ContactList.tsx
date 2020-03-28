import React from "react";
import List from "@material-ui/core/List";
import ContactListItem, {ContactListItemProps} from "./ContactListItem";

export interface ContactListProps {
    itemCount: number;
    getItem: (index: number) => ContactListItemProps;
}

function ContactList(props: ContactListProps) {
    const renderItem = (_: null, index: number) => (
        <ContactListItem
            key={index}
            {...props.getItem(index)}
        />
    );

    return (
        <List>
            {Array(props.itemCount).fill(null).map(renderItem)}
        </List>
    )
}

export default ContactList;
