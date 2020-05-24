import React from 'react';
import View from "../../../common/components/layout/View";
import LayoutToolbar from "../../../common/components/layout/LayoutToolbar";
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getContactByIdSelector, removeContactById} from "../../contacts/contactsSlice";
import {List} from "@material-ui/core";
import ErrorMessage from "../../../common/components/layout/ErrorMessage";
import DetailListItem from "../../../common/components/DetailListItem";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import NotificationsContactSwitch from "./NotificationsContactSwitch";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {Delete} from "@material-ui/icons";

function ContactProfile() {
    const {id: contactId = ''} = useParams();
    const dispatch = useDispatch();
    const selectContact = getContactByIdSelector(contactId);
    const contact = useSelector(selectContact);
    const removeContact = () => {
        const action = removeContactById(contactId);
        dispatch(action);
    }

    if (!contactId) return <ErrorMessage text="No data" />;

    const toolbar = (
        <LayoutToolbar
            title={`${contact?.firstName} ${contact?.lastName}`}
        />
    );

    const removeListItem = (
        <ListItem button onClick={removeContact}>
            <ListItemIcon>
                <Delete/>
            </ListItemIcon>
            <ListItemText
                primary="Remove from contacts"
            />
        </ListItem>
    );

    return (
        <View
            toolbar={toolbar}
        >
            <List>
                <NotificationsContactSwitch
                    contactId={contactId}
                />
            </List>
            <Divider/>
            <List>
                <ListSubheader>
                    Details
                </ListSubheader>
                <DetailListItem
                    primary="Phone number"
                    secondary={
                        <Link href={`tel: ${contact?.phoneNumber}`}>
                            {contact?.phoneNumber}
                        </Link>
                    }
                />
                <DetailListItem
                    primary="Email"
                    secondary={
                        <Link href={`mailto: ${contact?.email}`}>
                            {contact?.email}
                        </Link>
                    }
                />
                <DetailListItem
                    primary="Date of Birth"
                    secondary={contact?.dateOfBirth.toLocaleDateString()}
                />
                <DetailListItem
                    primary="Bio"
                    secondary={contact?.bio}
                />
            </List>
            <Divider/>
            <List>
                {removeListItem}
            </List>
        </View>
    );
}

export default ContactProfile;
