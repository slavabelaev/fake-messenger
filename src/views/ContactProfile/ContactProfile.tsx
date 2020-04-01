import React from 'react';
import View from "../../layout/View";
import LayoutToolbar from "../../layout/LayoutToolbar";
import { useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
import {selectContactById} from "../../components/ContactList/contactsSlice";
import {List} from "@material-ui/core";
import ErrorMessage from "../../layout/ErrorMessage";
import DetailListItem from "../../components/DetailListItem";
import FavoriteContactSwitch from "./FavoriteContactSwitch";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import NotificationsContactSwitch from "./NotificationsContactSwitch";
import Link from "@material-ui/core/Link";

export interface ContactProfileProps {}

function ContactProfile(props: ContactProfileProps) {
    const {id: contactId} = useParams();
    const contact = useSelector(selectContactById(contactId));

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
                <FavoriteContactSwitch
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
            </List>
        </View>
    );
}

export default ContactProfile;
