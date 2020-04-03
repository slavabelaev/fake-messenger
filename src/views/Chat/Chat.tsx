import React from "react";
import formatDistance from "date-fns/formatDistance";
import MessageList from "../../components/MessageList";
import ListItemToolbar from "../../components/ListItemToolbar";
import {useParams, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IconButton} from "@material-ui/core";
import {Attachment} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import View from "../../layout/View";
import {getContactByIdSelector} from "../../components/ContactList/contactsSlice";
import NotFound from "../NotFound";
import {switchMessagesCheckMode, messagesSearchQuery, selectChatMessages, removeMessagesAsync} from "../../components/MessageList/chatsSlice";
import PopoverAction from "../../components/PopoverAction";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Layout from "../../layout";
import ChatRoutes from "./ChatRoutes";
import {CONTACT_PROFILE_ROUTE_PATH} from "../ContactProfile";
import {CHAT_ATTACHMENTS_ROUTE_PATH} from "../Attachments";
import MenuListItem from "../../components/MenuListItem";

function Chat() {
    const { id: chatId = '' } = useParams();
    const { searchQuery } = useSelector(selectChatMessages(chatId));
    const contactSelector = getContactByIdSelector(chatId);
    const contact = useSelector(contactSelector);
    const dispatch = useDispatch();
    const removeAllMessages = () => removeMessagesAsync(chatId)(dispatch);
    const switchCheckMode = () => {
        const action = switchMessagesCheckMode({chatId});
        dispatch(action);
    };

    if (!chatId || !contact) return <NotFound/>;

    const renderPopover = (onClose: VoidFunction) => (
        <List>
            <MenuListItem
                primary="Select messages"
                onClick={() => {
                    switchCheckMode();
                    onClose();
                }}
            />
            <MenuListItem
                primary="Clear chat"
                onClick={() => {
                    removeAllMessages();
                    onClose();
                }}
            />
        </List>
    );

    const endAction = (
        <>
            <Tooltip title="Attachments">
                <IconButton
                    component={Link}
                    to={CHAT_ATTACHMENTS_ROUTE_PATH.replace(':id', chatId)}
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
        const action = messagesSearchQuery({
            chatId,
            searchQuery: value
        });
        dispatch(action);
    };

    const handleReset = () => {
        const action = messagesSearchQuery({
            chatId,
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
    const pathToProfile = CONTACT_PROFILE_ROUTE_PATH.replace(':id', chatId);
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
            <MessageList
                chatId={chatId}
            />
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
