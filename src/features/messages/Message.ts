import {Contact} from "../contacts/Contact";
import {Attachment} from "../attachments/Attachment";
import {AttachmentLink} from "../links/AttachmentLink";

export interface Message {
    id: string;
    text: string;
    createdBy?: Contact['id'];
    createdAt: Date;
    delivered: boolean;
    read: boolean;
    attachmentFile?: Attachment;
    attachmentLink?: AttachmentLink;
    createdByMe?: boolean;
}
