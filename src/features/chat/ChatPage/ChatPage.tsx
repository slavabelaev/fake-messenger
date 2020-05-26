import React from "react";
import formatDistance from "date-fns/formatDistance";
import MessageList from "../../messages/MessageList";
import ToolbarListItem from "../../../common/components/ToolbarListItem";
import {useParams, Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createStyles, IconButton, Theme, useMediaQuery, useTheme} from "@material-ui/core";
import {Attachment, Delete} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import View from "../../../common/components/layout/View";
import {getContactByIdSelector} from "../../contacts/contactsSlice";
import {
    switchMessagesCheckMode,
    messagesSearchQuery,
    selectChatById,
    removeMessagesSuccess,
    addMessageRequest
} from "../chatsSlice";
import PopoverAction from "../../../common/components/PopoverAction";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import {CONTACT_PROFILE_ROUTE_PATH} from "../../contacts/ContactProfilePage";
import {CHAT_ATTACHMENTS_ROUTE_PATH} from "../../attachments/AttachmentsPage";
import MenuListItem from "../../../common/components/MenuListItem";
import Toolbar from "@material-ui/core/Toolbar";
import SendMessageToolbar from "../../../common/components/SendMessageToolbar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {CONTACTS_ROUTE_PATH} from "../../contacts/ContactsPage";
import BackButton from "../../../common/components/layout/BackButton";

const useStyles = makeStyles((theme: Theme) => createStyles({
    cancelButton: {
        marginLeft: theme.spacing(1)
    }
}));

function ChatPage() {
    const classes = useStyles();
    const { id: chatId = '' } = useParams();
    const theme = useTheme();
    const isBreakpointSm = useMediaQuery(theme.breakpoints.down('sm'));
    const { searchQuery, checkedIds, checkModeEnabled, prints } = useSelector(selectChatById(chatId));
    const selectContact = getContactByIdSelector(chatId);
    const contact = useSelector(selectContact);
    const dispatch = useDispatch();
    const removeAllMessages = () => {
        const action = removeMessagesSuccess({chatId});
        dispatch(action);
    };
    const switchCheckMode = () => {
        const action = switchMessagesCheckMode({chatId});
        dispatch(action);
    };
    if (!chatId || !contact) return <Redirect to="/"/>;

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
            <Tooltip title="AttachmentsPage">
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
    const backButton = isBreakpointSm ? (
        <BackButton
            onClick={history => history.push(CONTACTS_ROUTE_PATH)}
        />
    ) : null;

    const toolbar = (
        <ToolbarListItem
            avatarSrc={contact?.avatarUrl}
            avatarTo={pathToProfile}
            primary={`${contact?.firstName} ${contact?.lastName}`}
            secondary={prints ? 'Prints...' : statusText}
            startAction={backButton}
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

    const handleRemove = () => {
        const action = removeMessagesSuccess({
            chatId,
            messageIds: checkedIds
        });
        dispatch(action);
    };

    const footer = checkModeEnabled ? (
        <Toolbar>
            <Button
                disabled={!checkedIds.length}
                onClick={handleRemove}
                startIcon={<Delete/>}
                variant="outlined"
                color="secondary"
            >
                Remove
            </Button>
            <Button
                className={classes.cancelButton}
                onClick={switchCheckMode}
            >
                Cancel
            </Button>
        </Toolbar>
    ) : (
        <SendMessageToolbar
            onSubmit={messageText => {
                messageText = messageText.trim();
                if (!messageText) return;
                const action = addMessageRequest({chatId, messageText});
                dispatch(action);
            }}
        />
    );

    return (
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
}

export default ChatPage;
