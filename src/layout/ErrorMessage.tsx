import React from 'react';
import {Typography} from "@material-ui/core";

export interface ErrorMessageProps {
    text?: string;
}

function ErrorMessage({
    text = 'That’s an error'
}: ErrorMessageProps) {
    return (
        <Typography
            variant="h6"
            color="error"
        >
            {text}
        </Typography>
    );
}

export default ErrorMessage;
