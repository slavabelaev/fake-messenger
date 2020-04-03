import {Model} from "../interfaces/Model";
import {Contact} from "./Contact";
import {Attachment} from "./Attachment";
import {AttachmentLink} from "./AttachmentLink";

export interface Message extends Model {
    text: string;
    createdBy?: Contact['id'];
    createdAt: Date;
    delivered: boolean;
    read: boolean;
    attachmentFile?: Attachment;
    attachmentLink?: AttachmentLink;

}
