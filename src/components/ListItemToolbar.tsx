import React, {ReactNode, useState} from 'react';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar, {AvatarProps} from "@material-ui/core/Avatar";
import ListItemText, {ListItemTextProps} from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import {Search} from "@material-ui/icons";
import Toolbar from "@material-ui/core/Toolbar";
import SearchInputBase, {SearchInputBaseProps} from "./SearchInputBase";
import {Tooltip} from "@material-ui/core";
import {Link} from "react-router-dom";

export interface UserToolbarProps {
    primary: ListItemTextProps['primary'];
    secondary: ListItemTextProps['secondary'];
    avatarSrc?: AvatarProps['src'];
    avatarTo?: string;
    endAction?: ReactNode;
    SearchInputBaseProps?: SearchInputBaseProps
}

type ViewName = 'search' | 'default';
const ESCAPE_KEY_CODE = 27;

function ListItemToolbar(props: UserToolbarProps) {
    const [viewName, setViewName] = useState<ViewName>('default');

    const handleBack = () => {
        const onBack = props.SearchInputBaseProps?.onBack;
        setViewName('default');
        onBack && onBack();
    };

    const searchView = () => (
        <SearchInputBase
            {...props.SearchInputBaseProps}
            onKeyUp={event => event.keyCode === ESCAPE_KEY_CODE && handleBack()}
            onBack={handleBack}
        />
    );

    const defaultView = () => {
        const avatar = props.avatarTo ? (
            <Tooltip title="Profile">
                <IconButton
                    edge="start"
                    size="small"
                    component={Link}
                    to={props.avatarTo}
                >
                    <Avatar
                        src={props.avatarSrc}
                    />
                </IconButton>
            </Tooltip>
        ) : (
            <Avatar
                src={props.avatarSrc}
            />
        );

        const searchButton = (
            <Tooltip title="Search">
                <IconButton
                    edge={props.endAction ? false : 'end'}
                    onClick={() => setViewName('search')}
                >
                    <Search/>
                </IconButton>
            </Tooltip>
        );

        return (
            <>
                <ListItemAvatar>
                    {avatar}
                </ListItemAvatar>
                <ListItemText
                    primary={props.primary}
                    secondary={props.secondary}
                />
                {searchButton}
                {props.endAction}
            </>
        );
    };

    const getView = (name: ViewName) => name === 'default'
        ? defaultView()
        : searchView();

    return (
        <Toolbar>
            {getView(viewName)}
        </Toolbar>
    );
}

export default ListItemToolbar;
