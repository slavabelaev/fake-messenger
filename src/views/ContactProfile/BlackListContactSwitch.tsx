import React from 'react';
import ListItemSwitch from "../../components/ListItemSwitch";
import {Contact} from "../../models/Contact";
import {useDispatch, useSelector} from "react-redux";
import {
    contactsSwitchBlackList,
    getContactByIdSelector
} from "../../components/ContactList/contactsSlice";

export interface BlackListContactSwitchProps {
    contactId: Contact['id'];
}

function BlackListContactSwitch({ contactId }: BlackListContactSwitchProps) {
    const selectContact = getContactByIdSelector(contactId);
    const contact = useSelector(selectContact);
    const dispatch = useDispatch();
    const inBlackList = contact?.inBlackList || false;
    return (
        <ListItemSwitch
            primary="Black List"
            checked={inBlackList}
            onChange={checked => {
                const action = contactsSwitchBlackList(contactId);
                dispatch(action);
            }}
        />
    );
}

export default BlackListContactSwitch;
