import React from 'react';
import AttachmentLinkList from "./AttachmentLinkList";
import {AttachmentLink} from "../../models/AttachmentLink";
import {AttachmentLinkListItemProps} from "./AttachmentLinkListItem";
import {useSelector} from "react-redux";
import {Chat} from "../../models/Chat";
import {selectChatAttachmentLinks} from "../MessageList/chatsSlice";
import Empty from "../Empty";

const mapLinkToItemProps = (link: AttachmentLink): AttachmentLinkListItemProps => ({
    primary: link.title,
    secondary: link.description,
    avatarSrc: link.imageUrl,
    to: link.url,
});

export interface LinkListContainerProps {
    chatId: Chat['id'];
}

function LinkListContainer({ chatId }: LinkListContainerProps) {
    const selectAttachmentLinks = selectChatAttachmentLinks(chatId);
    const attachmentLinks = useSelector(selectAttachmentLinks);

    if (!attachmentLinks.length) return <Empty/>;

    return (
        <AttachmentLinkList
            itemCount={attachmentLinks.length}
            getItem={index => mapLinkToItemProps(attachmentLinks[index])}
            getItemKey={index => attachmentLinks[index].id}
        />
    );
}

export default LinkListContainer;
