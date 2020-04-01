import React from 'react';
import ListItemSwitch from "../../components/ListItemSwitch";
import {Contact} from "../../models/Contact";
import {useDispatch, useSelector} from "react-redux";
import {
    contactsSwitchFavorite,
    getContactByIdSelector
} from "../../components/ContactList/contactsSlice";

export interface FavoriteContactSwitchProps {
    contactId: Contact['id'];
}

function FavoriteContactSwitch({ contactId }: FavoriteContactSwitchProps) {
    const contactSelector = getContactByIdSelector(contactId);
    const contact = useSelector(contactSelector);
    const dispatch = useDispatch();
    const isFavorite = contact?.isFavorite || false;
    return (
        <ListItemSwitch
            primary="Favorite"
            checked={isFavorite}
            onChange={checked => {
                const action = contactsSwitchFavorite(contactId);
                dispatch(action);
            }}
        />
    );
}

export default FavoriteContactSwitch;
