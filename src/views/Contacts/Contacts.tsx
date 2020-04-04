import React, {useState} from 'react';
import ContactList from "../../components/ContactList";
import ListItemToolbar from "../../components/ListItemToolbar";
import {Add, Settings} from "@material-ui/icons";
import {createStyles, Fab, IconButton, Theme} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import {NavLink} from "react-router-dom";
import {SETTINGS_ROUTE_PATH} from "../Settings";
import {PROFILE_ROUTE_PATH} from "../Profile";
import View from "../../layout/View";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../app/authSlice";
import {addContactAsync, contactsSearchQuery} from '../../components/ContactList/contactsSlice';
import ErrorMessage from "../../layout/ErrorMessage";
import Loading from "../../layout/Loading";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {makeStyles} from "@material-ui/core/styles";

const CHATS_TAB_VALUE = 0;

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
    const [tabsValue, setTabsValue] = useState(CHATS_TAB_VALUE);
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

    const tabs = (
        <Tabs
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            value={tabsValue}
            onChange={(event, value) => setTabsValue(value)}
        >
            <Tab
                label="Chats"
            />
            <Tab
                label="Contacts"
            />
        </Tabs>
    );

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
        <div>
            <ListItemToolbar
                primary={`${user.firstName} ${user.lastName}`}
                secondary={statusText}
                avatarSrc={user.avatarUrl}
                avatarTo={PROFILE_ROUTE_PATH}
                endAction={settingsButton}
                SearchInputBaseProps={{
                    placeholder: 'Search ' + (tabsValue === 0 ? 'chats' : 'contacts'),
                    onChange: handleSearch,
                    onClear: handleReset,
                    onBack: handleReset
                }}
            />
            {tabs}
        </div>
    );

    const addButton = (
        <Fab
            className={classes.fab}
            color="primary"
            onClick={() => {
                const userId = Math.random().toString(16);
                addContactAsync(userId)(dispatch);
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
