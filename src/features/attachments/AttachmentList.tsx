import React from "react";
import {useSelector} from "react-redux";
import AttachmentList from "../../common/components/AttachmentList/AttachmentList";
import {Attachment} from "./Attachment";
import {AttachmentListItemProps} from "../../common/components/AttachmentList/AttachmentListItem";
import {Chat} from "../chat/Chat";
import {selectChatAttachmentsById} from "../chat/chatsSlice";
import Empty from "../../common/components/layout/Empty";
import Loading from "../../common/components/layout/Loading";

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
    const selectAttachments = selectChatAttachmentsById(chatId);
    const attachments = useSelector(selectAttachments);

    if (!attachments) return <Loading/>;
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
