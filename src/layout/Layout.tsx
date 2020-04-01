import React, {PropsWithChildren, ReactNode} from "react";
import ErrorBoundary from "./ErrorBoundary";
import {AppBar, createStyles, Theme, TypographyProps} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";

export type LayoutProps = PropsWithChildren<{
    title: TypographyProps['children'];
    leftSide?: ReactNode;
    rightSide?: ReactNode;
}>

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    content: {
        display: 'flex',
        height: 'calc(100% - 66px)'
    },
    leftSide: {
        minWidth: 360,
        maxWidth: 360,
        overflow: 'auto',
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        borderRightColor: theme.palette.grey.A100,
    },
    rightSide: {
        minWidth: 360,
        maxWidth: 360,
        overflow: 'auto',
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: theme.palette.grey.A100,
    },
    main: {
        flex: 'auto',
        overflow: 'auto'
    },
    appTitle: {
        marginRight: 'auto',
        textDecoration: 'none'
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4)
    }
}));

function Layout(props: LayoutProps) {
    const classes = useStyles();

    const appBar = (
        <AppBar
            position="static"
            elevation={0}
        >
            <Toolbar>
                <Typography
                    className={classes.appTitle}
                    variant="h6"
                    color="inherit"
                    component={Link}
                    to="/"
                >
                    {props.title}
                </Typography>
                <IconButton
                    edge="end"
                    size="small"
                >
                    <Avatar
                        className={classes.avatar}
                    />
                </IconButton>
            </Toolbar>
        </AppBar>
    );

    const leftSide = props.leftSide && (
        <aside className={classes.leftSide}>
            {props.leftSide}
        </aside>
    );

    const rightSide = props.rightSide && (
        <aside className={classes.rightSide}>
            {props.rightSide}
        </aside>
    );

    const main = (
        <ErrorBoundary>
            <main className={classes.main}>
                {props.children}
            </main>
        </ErrorBoundary>
    );

    return (
        <div className={classes.root}>
            {appBar}
            <div className={classes.content}>
                {leftSide}
                {main}
                {rightSide}
            </div>
        </div>
    )
}

export default Layout;
