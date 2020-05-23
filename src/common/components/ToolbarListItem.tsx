import React, {ReactNode, useState} from 'react';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar, {AvatarProps} from "@material-ui/core/Avatar";
import ListItemText, {ListItemTextProps} from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import {Search} from "@material-ui/icons";
import Toolbar from "@material-ui/core/Toolbar";
import SearchInputBase, {SearchInputBaseProps} from "./SearchInputBase";
import {createStyles, Theme, Tooltip} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

export interface UserToolbarProps {
    primary: ListItemTextProps['primary'];
    secondary: ListItemTextProps['secondary'];
    avatarSrc?: AvatarProps['src'];
    avatarTo?: string;
    endAction?: ReactNode;
    startAction?: ReactNode;
    SearchInputBaseProps?: SearchInputBaseProps
}

type ViewName = 'search' | 'default';
const ESCAPE_KEY_CODE = 27;

const useStyles = makeStyles((theme: Theme) => createStyles({
    primaryText: {
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

function ToolbarListItem(props: UserToolbarProps) {
    const classes = useStyles();
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
                {props.startAction}
                <ListItemAvatar>
                    {avatar}
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <span className={classes.primaryText}>
                            {props.primary}
                        </span>
                    }
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

export default ToolbarListItem;
