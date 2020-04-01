import React, {PropsWithChildren, ReactNode} from "react";
import ErrorBoundary from "./ErrorBoundary";
import {createStyles, Theme, TypographyProps} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export type LayoutProps = PropsWithChildren<{
    title?: TypographyProps['children'];
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
        height: '100%'
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
            {/*{appBar}*/}
            <div className={classes.content}>
                {leftSide}
                {main}
                {rightSide}
            </div>
        </div>
    )
}

export default Layout;
