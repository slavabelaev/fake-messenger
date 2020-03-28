import React, {useEffect} from 'react';
import AttachmentList from "./AttachmentList";
import {Attachment} from "../../models/Attachment";
import {AttachmentListItemProps} from "./AttachmentListItem";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {CircularProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {fetchAttachments} from "./attachmentsSlice";

const mapAttachmentToItemProps = (attachment: Attachment): AttachmentListItemProps => ({
    name: attachment.name,
    size: attachment.size,
    lastModified: attachment.lastModified,
    type: attachment.type,
    avatarSrc: attachment.imageUrl
});

export interface AttachmentListContainerProps {}

function AttachmentListContainer(props: AttachmentListContainerProps) {
    const { error, items, loading } = useSelector((state: RootState) => state.attachments);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAttachments()(dispatch);
    }, [dispatch]);

    if (loading) return (
        <CircularProgress />
    );

    if (error) return (
        <Typography color="error">
            Error
        </Typography>
    );

    return (
        <AttachmentList
            itemCount={items.length}
            getItem={(index) => mapAttachmentToItemProps(items[index])}
        />
    );
}

export default AttachmentListContainer;
