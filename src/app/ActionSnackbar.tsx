import React from "react";
import {Snackbar, SnackbarProps} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectStatus, resetStatus} from "../store/statusSlice";

function ActionSnackbar() {
    const {message, autoHideDuration} = useSelector(selectStatus);
    const dispatch = useDispatch();
    const hasMessage = Boolean(message);
    const hideSnackbar = () => dispatch(resetStatus());

    if (!hasMessage) return null;

    const handleClose: SnackbarProps['onClose'] = (event, reason) => {
        hideSnackbar();
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={hideSnackbar}
        >
            <Close fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={hasMessage}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            message={message}
            action={action}
        />
    );
}

export default ActionSnackbar;