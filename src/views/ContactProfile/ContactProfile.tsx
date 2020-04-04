import React from 'react';
import View from "../../layout/View";
import LayoutToolbar from "../../layout/LayoutToolbar";
import { useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
import {getContactByIdSelector} from "../../components/ContactList/contactsSlice";
import {List} from "@material-ui/core";
import ErrorMessage from "../../layout/ErrorMessage";
import DetailListItem from "../../components/DetailListItem";
import BlackListContactSwitch from "./BlackListContactSwitch";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import NotificationsContactSwitch from "./NotificationsContactSwitch";
import Link from "@material-ui/core/Link";

export interface ContactProfileProps {}

function ContactProfile(props: ContactProfileProps) {
    const {id: contactId = ''} = useParams();
    const selectContact = getContactByIdSelector(contactId);
    const contact = useSelector(selectContact);

    if (!contactId) return <ErrorMessage text="No data" />

    const toolbar = (
        <LayoutToolbar
            title={`${contact?.firstName} ${contact?.lastName}`}
        />
    );

    return (
        <View
            toolbar={toolbar}
        >
            <List>
                <BlackListContactSwitch
                    contactId={contactId}
                />
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
        </View>
    );
}

export default ContactProfile;
