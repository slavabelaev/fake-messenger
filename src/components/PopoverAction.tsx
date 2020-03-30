import React, {ReactNode, useState} from 'react';
import {IconButtonProps, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {MoreVert} from "@material-ui/icons";
import Popover from "@material-ui/core/Popover";

export interface PopoverButtonProps {
    renderButton?: (onClick: IconButtonProps['onClick']) => ReactNode;
    renderPopover: (onClose: VoidFunction) => ReactNode;
}

function PopoverAction(props: PopoverButtonProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const iconButton = (
        <Tooltip title="Details">
            <IconButton
                edge="end"
                onClick={handleClick}
            >
                <MoreVert/>
            </IconButton>
        </Tooltip>
    );

    const popover = (
        <Popover
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
        >
            {props.renderPopover(handleClose)}
        </Popover>
    );

    return (
        <>
            {iconButton}
            {popover}
        </>
    );
}

export default PopoverAction;
