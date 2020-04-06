import React from 'react';
import {Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export interface ErrorMessageProps {
    text?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        height: '100%'
    }
}));

function ErrorMessage({
    text = 'That’s an error'
}: ErrorMessageProps) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography
                variant="h6"
                color="error"
            >
                {text}
            </Typography>
        </div>
    );
}

export default ErrorMessage;
