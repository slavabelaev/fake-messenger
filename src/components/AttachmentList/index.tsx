import React, {useEffect} from 'react';
import AttachmentList from "./AttachmentList";
import {Attachment} from "../../models/Attachment";
import {AttachmentListItemProps} from "./AttachmentListItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchAttachments, selectAttachments} from "./attachmentsSlice";
import ErrorMessage from "../../layout/ErrorMessage";
import Loading from "../../layout/Loading";
import {Chat} from "../../models/Chat";

const mapAttachmentToItemProps = (attachment: Attachment): AttachmentListItemProps => ({
    key: attachment.id,
    name: attachment.name,
    size: attachment.size,
    lastModified: attachment.lastModified,
    type: attachment.type,
    avatarSrc: attachment.imageUrl
});

export interface AttachmentListContainerProps {
    chatId: Chat['id'];
}

function AttachmentListContainer({ chatId }: AttachmentListContainerProps) {
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
