import React from 'react';
import ContactList from "../../components/ContactList";
import ListItemToolbar from "../../layout/ListItemToolbar";
import {Settings} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import {NavLink} from "react-router-dom";
import {SETTINGS_ROUTE_PATH} from "../Settings";
import {PROFILE_ROUTE_PATH} from "../Profile";
import View from "../../layout/View";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../app/authSlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { contactsSearchQuery } from '../../components/ContactList/contactsSlice';

export interface ContactsProps {}

function Contacts(props: ContactsProps) {
    const { error, loading, user } = useSelector(authSelector);
    const dispatch = useDispatch();

    if (loading) return (
        <CircularProgress />
    );

    if (error) return (
        <Typography color="error">
            Error
        </Typography>
    );

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

    if (!user) return (
        <Typography>
            No Data
        </Typography>
    );

    const handleSearch = (value: string) => {
        const action = contactsSearchQuery(value);
        dispatch(action);
    };

    const handleReset = () => {
        const action = contactsSearchQuery('');
        dispatch(action);
    };

    const toolbar = (
        <ListItemToolbar
            primary={`${user.firstName} ${user.lastName}`}
            secondary={user.isOnline ? 'Online' : 'Offline'}
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

    return (
        <View
            toolbar={toolbar}
        >
            <ContactList/>
        </View>
    )
}

export default Contacts;
