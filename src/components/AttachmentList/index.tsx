import React from 'react';
import AttachmentList from "./AttachmentList";
import {Attachment} from "../../models/Attachment";
import {AttachmentListItemProps} from "./AttachmentListItem";
import {useSelector} from "react-redux";
import {Chat} from "../../models/Chat";
import {selectChatByIdAttachments} from "../../store/chatsSlice";
import Empty from "../Empty";

const mapAttachmentToItemProps = (attachment: Attachment): AttachmentListItemProps => ({
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
    const selectAttachments = selectChatByIdAttachments(chatId);
    const attachments = useSelector(selectAttachments);

    if (!attachments.length) return <Empty/>;

    return (
        <AttachmentList
            itemCount={attachments.length}
            getItem={index => mapAttachmentToItemProps(attachments[index])}
            getItemKey={index => attachments[index].id}
        />
    );
}

export default AttachmentListContainer;
