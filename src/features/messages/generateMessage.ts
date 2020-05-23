import faker from "faker";
import {generateAttachmentLink} from "../attachments/generateAttachmentLink";
import {generateAttachment} from "../attachments/generateAttachment";
import {Message} from "./Message";

export function generateMessage(): Message {
    const hasAttachmentFile = Math.random() > .8;
    const hasAttachmentLink = Math.random() > .5;
    return {
        id: faker.random.uuid(),
        text: faker.lorem.text(),
        createdBy: faker.random.uuid(),
        createdAt: faker.date.recent(0),
        delivered: true,
        read: true,
        attachmentFile: hasAttachmentFile ? generateAttachment() : undefined,
        attachmentLink: hasAttachmentLink ? generateAttachmentLink() : undefined,
        createdByMe: faker.random.boolean()
    }
}