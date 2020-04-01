import React, {useEffect} from 'react';
import AttachmentList from "./AttachmentList";
import {Attachment} from "../../models/Attachment";
import {AttachmentListItemProps} from "./AttachmentListItem";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/rootReducer";
import {fetchAttachments, selectAttachments} from "./attachmentsSlice";
import ErrorMessage from "../../layout/ErrorMessage";
import Loading from "../../layout/Loading";

const mapAttachmentToItemProps = (attachment: Attachment): AttachmentListItemProps => ({
    key: attachment.id,
    name: attachment.name,
    size: attachment.size,
    lastModified: attachment.lastModified,
    type: attachment.type,
    avatarSrc: attachment.imageUrl
});

export interface AttachmentListContainerProps {}

function AttachmentListContainer(props: AttachmentListContainerProps) {
    const { error, items, loading } = useSelector(selectAttachments);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAttachments()(dispatch);
    }, [dispatch]);

    if (loading) return <Loading/>;
    if (error) return <ErrorMessage/>;

    return (
        <AttachmentList
            itemCount={items.length}
            getItem={(index) => mapAttachmentToItemProps(items[index])}
        />
    );
}

export default AttachmentListContainer;
