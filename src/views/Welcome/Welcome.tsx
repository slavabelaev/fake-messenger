import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectAuth} from "../../app/authSlice";
import ErrorMessage from "../../layout/ErrorMessage";
import Loading from "../../layout/Loading";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 72,
        height: 72,
        marginBottom: theme.spacing(2)
    }
}));

function Welcome() {
    const classes = useStyles();
    const { user, error, loading } = useSelector(selectAuth);

    if (loading || !user) return <Loading/>;
    if (error) return <ErrorMessage/>;

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Avatar
                    className={classes.avatar}
                    src={user?.avatarUrl}
                />
                <Typography
                    variant="h6"
                    component="h2"
                >
                    Welcome to Fake Messenger, {user?.firstName}
                </Typography>
                <Typography>

                </Typography>
            </header>
        </div>
    );
}

export default Welcome;
