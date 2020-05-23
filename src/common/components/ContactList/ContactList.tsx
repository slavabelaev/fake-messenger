import React, {Key} from "react";
import ContactListItem, {ContactListItemProps} from "./ContactListItem";
import ListView from "../ListView";

export interface ContactListProps {
    itemCount: number;
    getItem: (index: number) => ContactListItemProps;
    getItemKey?: (index: number) => Key;
}

function ContactList({
    itemCount,
    getItem,
    getItemKey
}: ContactListProps) {
    const renderItem = (index: number) => {
        const itemProps = getItem(index);
        const itemKey = getItemKey ? getItemKey(index) : index;
        return (
            <ContactListItem
                key={itemKey}
                {...itemProps}
            />
        )
    };

    return (
        <ListView
            itemCount={itemCount}
            renderItem={renderItem}
        />
    )
}

export default ContactList;
