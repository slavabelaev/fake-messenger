import React from "react";
import {useHistory} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack} from "@material-ui/icons";

export interface BackButtonProps {
    onClick?: (history: ReturnType<typeof useHistory>) => void;
}

function BackButton({ onClick }: BackButtonProps) {
    const history = useHistory();

    return (
        <Tooltip title="Back">
            <IconButton
                edge="start"
                onClick={() => onClick ? onClick(history) : history.goBack()}
            >
                <ArrowBack/>
            </IconButton>
        </Tooltip>
    );
}

export default BackButton;