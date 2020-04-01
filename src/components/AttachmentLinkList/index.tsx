import React, {useEffect} from 'react';
import AttachmentLinkList from "./AttachmentLinkList";
import {AttachmentLink} from "../../models/AttachmentLink";
import {AttachmentLinkListItemProps} from "./AttachmentLinkListItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchAttachmentLinks, selectAttachmentLinks} from "./attachmentLinksSlice";
import ErrorMessage from "../../layout/ErrorMessage";
import Loading from "../../layout/Loading";

const mapLinkToItemProps = (link: AttachmentLink): AttachmentLinkListItemProps => ({
    key: link.id,
    primary: link.title,
    secondary: link.description,
    avatarSrc: link.imageUrl,
    to: link.url,
});

export interface LinkListContainerProps {}

function LinkListContainer(props: LinkListContainerProps) {
    const { error, items, loading } = useSelector(selectAttachmentLinks);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAttachmentLinks()(dispatch);
    }, [dispatch]);

    if (loading) return <Loading/>;
    if (error) return <ErrorMessage/>;

    return (
        <AttachmentLinkList
            itemCount={items.length}
            getItem={(index) => mapLinkToItemProps(items[index])}
        />
    );
}

export default LinkListContainer;
