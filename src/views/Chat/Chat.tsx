import React, {useEffect} from "react";
import formatDistance from "date-fns/formatDistance";
import MessageList from "../../components/MessageList";
import ListItemToolbar from "../../components/ListItemToolbar";
import {useParams, useLocation, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IconButton} from "@material-ui/core";
import {Attachment} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import View from "../../layout/View";
import {selectContactById} from "../../components/ContactList/contactsSlice";
import NotFound from "../NotFound";
import {messagesSearchQuery, selectContactMessages} from "../../components/MessageList/messagesSlice";
import PopoverAction from "../../components/PopoverAction";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Layout from "../../layout";
import ChatRoutes from "./ChatRoutes";
import {CONTACT_PROFILE_ROUTE_PATH} from "../ContactProfile";
import {CHAT_ATTACHMENTS_ROUTE_PATH} from "../Attachments";

function Chat() {
    const { id: contactId } = useParams();
    const { searchQuery } = useSelector(selectContactMessages(contactId));
    const contact = useSelector(selectContactById(contactId));
    const dispatch = useDispatch();

    if (!contactId || !contact) return <NotFound/>;

    const renderPopover = (onClose: VoidFunction) => (
        <List>
            <ListItem button
                      onClick={onClose}
            >
                <ListItemText
                    primary={"delete messages"}
                />
            </ListItem>
        </List>
    );

    const endAction = (
        <>
            <Tooltip title="Attachments">
                <IconButton
                    component={Link}
                    to={CHAT_ATTACHMENTS_ROUTE_PATH.replace(':id', contactId)}
                >
                    <Attachment/>
                </IconButton>
            </Tooltip>
            <PopoverAction
                renderPopover={renderPopover}
            />
        </>
    );

    const handleSearch = (value: string) => {
        if (!contactId) return;
        const action = messagesSearchQuery({
            contactId,
            searchQuery: value
        });
        dispatch(action);
    };

    const handleReset = () => {
        if (!contactId) return;
        const action = messagesSearchQuery({
            contactId,
            searchQuery: ''
        });
        dispatch(action);
    };

    const statusText = contact?.isOnline
        ? (
            <Typography
                variant="inherit"
                color="primary"
            >
                Online
            </Typography>
        )
        : formatDistance(new Date(), contact?.lastVisitAt);
    const pathToProfile = CONTACT_PROFILE_ROUTE_PATH.replace(':id', contactId);
    const toolbar = (
        <ListItemToolbar
            avatarSrc={contact?.avatarUrl}
            avatarTo={pathToProfile}
            primary={`${contact?.firstName} ${contact?.lastName}`}
            secondary={statusText}
            endAction={endAction}
            SearchInputBaseProps={{
                placeholder: 'Search messages',
                onChange: handleSearch,
                onClear: handleReset,
                onBack: handleReset,
                initialValue: searchQuery
            }}
        />
    );

    const content = (
        <View
            toolbar={toolbar}
        >
            <MessageList/>
        </View>
    );

    return (
        <Layout
            rightSide={<ChatRoutes/>}
        >
            {content}
        </Layout>
    )
}

export default Chat;
