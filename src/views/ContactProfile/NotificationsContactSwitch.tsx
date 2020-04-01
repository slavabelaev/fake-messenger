import React from 'react';
import ListItemSwitch from "../../components/ListItemSwitch";
import {Contact} from "../../models/Contact";
import {useDispatch, useSelector} from "react-redux";
import {selectContactById, contactsSwitchNotifications} from "../../components/ContactList/contactsSlice";

export interface NotificationsContactSwitchProps {
    contactId: Contact['id'];
}

function NotificationsContactSwitch({ contactId }: NotificationsContactSwitchProps) {
    const contactSelector = selectContactById(contactId);
    const contact = useSelector(contactSelector);
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
