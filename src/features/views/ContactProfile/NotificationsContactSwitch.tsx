import React from 'react';
import SwitchListItem from "../../../common/components/SwitchListItem";
import {Contact} from "../../contacts/Contact";
import {useDispatch, useSelector} from "react-redux";
import {
    contactsSwitchNotifications,
    getContactByIdSelector
} from "../../contacts/contactsSlice";

export interface NotificationsContactSwitchProps {
    contactId: Contact['id'];
}

function NotificationsContactSwitch({ contactId }: NotificationsContactSwitchProps) {
    const selectContact = getContactByIdSelector(contactId);
    const contact = useSelector(selectContact);
    const dispatch = useDispatch();
    const notificationsEnabled = contact?.notificationsEnabled || false;
    return (
        <SwitchListItem
            primary="Notifications"
            checked={notificationsEnabled}
            onChange={async checked => {
                const action = contactsSwitchNotifications(contactId);
                dispatch(action);
            }}
        />
    );
}

export default NotificationsContactSwitch;
