import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    header: {
        textAlign: 'center'
    }
}));

function NotFound() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Typography
                    variant="h6"
                    component="h2"
                    color="error"
                >
                    That’s an error 404
                </Typography>
                <Typography>
                    The requested URL was not found on this server. That’s all we know.
                </Typography>
            </header>
        </div>
    )
}

export default NotFound;
