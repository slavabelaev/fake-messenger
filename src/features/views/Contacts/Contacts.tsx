import React from 'react';
import ContactList from "../../contacts/ContactList";
import ToolbarListItem from "../../../common/components/ToolbarListItem";
import {Add, Settings} from "@material-ui/icons";
import {createStyles, Fab, IconButton, Theme} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import {NavLink} from "react-router-dom";
import {SETTINGS_ROUTE_PATH} from "../Settings";
import {PROFILE_ROUTE_PATH} from "../Profile";
import View from "../../../common/components/layout/View";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../auth/authSlice";
import {addOneContact, contactsSearchQuery} from '../../contacts/contactsSlice';
import ErrorMessage from "../../../common/components/layout/ErrorMessage";
import Loading from "../../../common/components/layout/Loading";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {generateContact} from "../../contacts/generateContact";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: 'relative'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}));

function Contacts() {
    const classes = useStyles();
    const { error, loading, user } = useSelector(selectAuth);
    const dispatch = useDispatch();

    if (loading || !user) return <Loading />;
    if (error) return <ErrorMessage/>;

    const settingsButton = (
        <Tooltip title="Settings">
            <IconButton
                edge="end"
                component={NavLink}
                to={SETTINGS_ROUTE_PATH}
            >
                <Settings/>
            </IconButton>
        </Tooltip>
    );

    const handleSearch = (value: string) => {
        const action = contactsSearchQuery(value);
        dispatch(action);
    };

    const handleReset = () => {
        const action = contactsSearchQuery('');
        dispatch(action);
    };

    const statusText = user.isOnline
        ? (
            <Typography
                variant="inherit"
                color="primary"
            >
                Online
            </Typography>
        )
        : 'Offline';
    const toolbar = (
        <ToolbarListItem
            primary={`${user.firstName} ${user.lastName}`}
            secondary={statusText}
            avatarSrc={user.avatarUrl}
            avatarTo={PROFILE_ROUTE_PATH}
            endAction={settingsButton}
            SearchInputBaseProps={{
                placeholder: 'Search contacts',
                onChange: handleSearch,
                onClear: handleReset,
                onBack: handleReset
            }}
        />
    );

    const addButton = (
        <Fab
            className={classes.fab}
            color="primary"
            onClick={() => {
                const contact = generateContact();
                const action = addOneContact(contact);
                dispatch(action);
            }}
        >
            <Add/>
        </Fab>
    );

    return (
        <View
            toolbar={toolbar}
            className={classes.root}
        >
            <ContactList/>
            {addButton}
        </View>
    )
}

export default Contacts;
