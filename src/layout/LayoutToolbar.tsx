import React, {ReactNode} from 'react';
import Typography, {TypographyProps} from "@material-ui/core/Typography";
import {createStyles, Theme, Toolbar, useMediaQuery, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import BackButton from "./BackButton";

export interface ViewToolbarProps {
    title?: TypographyProps['children'];
    startAction?: ReactNode;
    endAction?: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        background: theme.palette.background.paper
    },
    title: {
        marginRight: 'auto',
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));

function LayoutToolbar(props: ViewToolbarProps) {
    const classes = useStyles();
    const theme = useTheme();
    const isBreakpointSm = useMediaQuery(theme.breakpoints.down('sm'));

    const title = (
        <Typography className={classes.title}>
            {props.title}
        </Typography>
    );

    const startAction = props.startAction ? props.startAction : isBreakpointSm
        ? <BackButton/> : null;

    return (
        <Toolbar className={classes.root}>
            {startAction}
            {title}
            {props.endAction}
        </Toolbar>
    );
}

export default LayoutToolbar;
