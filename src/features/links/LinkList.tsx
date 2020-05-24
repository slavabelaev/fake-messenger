import React from 'react';
import LinkList from "../../common/components/LinkList/LinkList";
import {AttachmentLink} from "./AttachmentLink";
import {AttachmentLinkListItemProps} from "../../common/components/LinkList/LinkListItem";
import {useSelector} from "react-redux";
import {Chat} from "../chat/Chat";
import {selectChatLinksById} from "../chat/chatsSlice";
import Empty from "../../common/components/layout/Empty";
import Loading from "../../common/components/layout/Loading";

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
    const selectLinks = selectChatLinksById(chatId);
    const links = useSelector(selectLinks);

    if (!links) return <Loading/>;
    if (!links.length) return <Empty/>;

    return (
        <LinkList
            itemCount={links.length}
            getItem={index => mapLinkToItemProps(links[index])}
            getItemKey={index => links[index].id}
        />
    );
}

export default LinkListContainer;
