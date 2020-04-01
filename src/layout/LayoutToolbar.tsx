import React, {ReactNode} from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack} from "@material-ui/icons";
import Typography, {TypographyProps} from "@material-ui/core/Typography";
import {createStyles, Theme, Toolbar} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

export interface ViewToolbarProps {
    title?: TypographyProps['children'];
    endAction?: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        marginRight: 'auto'
    }
}));

function LayoutToolbar(props: ViewToolbarProps) {
    const classes = useStyles();
    const history = useHistory();

    const backButton = (
        <Tooltip title="Back">
            <IconButton
                edge="start"
                onClick={history.goBack}
            >
                <ArrowBack/>
            </IconButton>
        </Tooltip>
    );

    const title = (
        <Typography className={classes.title}>
            {props.title}
        </Typography>
    );

    return (
        <Toolbar>
            {backButton}
            {title}
            {props.endAction}
        </Toolbar>
    );
}

export default LayoutToolbar;
