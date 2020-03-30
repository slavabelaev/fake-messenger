import React from "react";
import MessageList from "../../components/MessageList";
import ListItemToolbar from "../../components/ListItemToolbar";
import { useParams } from "react-router-dom";
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

function Chat() {
    const { id: contactId } = useParams();
    const { searchQuery } = useSelector(selectContactMessages(contactId));
    const contact = useSelector(selectContactById(contactId));
    const dispatch = useDispatch();

    if (!contact) return <NotFound/>;

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
                <IconButton>
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

    const toolbar = (
        <ListItemToolbar
            avatarSrc={contact?.avatarUrl}
            primary={`${contact?.firstName} ${contact?.lastName}`}
            secondary="Online"
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

    return (
        <View
            toolbar={toolbar}
        >
            <MessageList/>
        </View>
    )
}

export default Chat;
