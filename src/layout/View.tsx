import React, {PropsWithChildren, ReactNode} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export type ViewProps = PropsWithChildren<{
    className?: HTMLDivElement['className'];
    toolbar?: ReactNode;
    footer?: ReactNode;
}>;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    content: {
        overflow: 'auto',
        flex: 'auto'
    },
    toolbar: {
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
    },
    footer: {
        borderTopColor: theme.palette.divider,
        borderTopStyle: 'solid',
        borderTopWidth: 1
    },
}));

function View(props: ViewProps) {
    const classes = useStyles();
    const classNames = [props.className, classes.root].join(' ');

    const content = (
        <div
            className={classes.content}
        >
            {props.children}
        </div>
    );

    const toolbar = props.toolbar && (
        <div className={classes.toolbar}>
            {props.toolbar}
        </div>
    );

    const footer = props.footer && (
        <div className={classes.footer}>
            {props.footer}
        </div>
    );

    return (
        <div className={classNames}>
            {toolbar}
            {content}
            {footer}
        </div>
    );
}

export default View;
