import React from "react";
import formatDistance from "date-fns/formatDistance";
import MessageList from "../../components/MessageList";
import ListItemToolbar from "../../components/ListItemToolbar";
import {useParams, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createStyles, IconButton, Theme} from "@material-ui/core";
import {Attachment, Delete} from "@material-ui/icons";
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
import Toolbar from "@material-ui/core/Toolbar";
import SendMessageToolbar from "../../components/SendMessageToolbar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
    cancelButton: {
        marginLeft: theme.spacing(1)
    }
}));

function Chat() {
    const classes = useStyles();
    const { id: chatId = '' } = useParams();
    const { searchQuery, checkedIds, checkModeEnabled } = useSelector(selectChatMessages(chatId));
    const selectContact = getContactByIdSelector(chatId);
    const contact = useSelector(selectContact);
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
                primary={checkModeEnabled ? 'Cancel select' : 'Select messages'}
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

    const handleDelete = () => removeMessagesAsync(chatId, checkedIds)(dispatch);

    const footer = checkModeEnabled ? (
        <Toolbar>
            <Button
                disabled={!checkedIds.length}
                onClick={handleDelete}
                startIcon={<Delete/>}
                variant="outlined"
                color="secondary"
            >
                Delete
            </Button>
            <Button
                className={classes.cancelButton}
                onClick={handleDelete}
            >
                Cancel
            </Button>
        </Toolbar>
    ) : (
        <SendMessageToolbar
            chatId={chatId}
        />
    );

    const content = (
        <View
            toolbar={toolbar}
            footer={footer}
            needScrollBottom={!checkModeEnabled}
        >
            <Container
                disableGutters
                maxWidth="md"
            >
                <MessageList
                    chatId={chatId}
                />
            </Container>
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
