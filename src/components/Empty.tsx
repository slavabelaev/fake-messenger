import React, {ReactNode} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {Archive} from "@material-ui/icons";

export interface EmptyProps {
    primary?: string;
    secondary?: string;
    image?: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        height: '100%'
    },
    avatar: {
        marginBottom: theme.spacing(2),
        width: 72,
        height: 72,
        fontSize: 40
    }
}));

function Empty({
    primary = 'There is nothing',
    secondary = 'Maybe something will be here',
    image
}: EmptyProps) {
    const classes = useStyles();
    return (
        <div
            className={classes.root}
        >
            <Avatar className={classes.avatar}>
                <Archive fontSize="inherit" />
            </Avatar>
            <Typography variant="h6">
                {primary}
            </Typography>
            <Typography variant="body1">
                {secondary}
            </Typography>
        </div>
    )
}

export default Empty;