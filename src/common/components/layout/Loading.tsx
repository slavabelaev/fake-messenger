import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    }
}));

function Loading() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress/>
        </div>
    );
}

export default Loading;
