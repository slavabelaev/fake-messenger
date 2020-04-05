import React from 'react';
import ListItemSwitch from "../../components/ListItemSwitch";
import {Contact} from "../../models/Contact";
import {useDispatch, useSelector} from "react-redux";
import {
    contactsSwitchNotifications,
    getContactByIdSelector
} from "../../store/contactsSlice";

export interface NotificationsContactSwitchProps {
    contactId: Contact['id'];
}

function NotificationsContactSwitch({ contactId }: NotificationsContactSwitchProps) {
    const selectContact = getContactByIdSelector(contactId);
    const contact = useSelector(selectContact);
    const dispatch = useDispatch();
    const notificationsEnabled = contact?.notificationsEnabled || false;
    return (
        <ListItemSwitch
            primary="Notifications"
            checked={notificationsEnabled}
            onChange={checked => {
                const action = contactsSwitchNotifications(contactId);
                dispatch(action);
            }}
        />
    );
}

export default NotificationsContactSwitch;
