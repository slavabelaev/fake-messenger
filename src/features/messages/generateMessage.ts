import faker from "faker";
import {generateAttachmentLink} from "../links/generateAttachmentLink";
import {generateAttachment} from "../attachments/generateAttachment";
import {Message} from "./Message";

// Source: https://emojipedia.org/stats/
// Most popular emoji
const generateRandomEmoji = (): string => {
    if (Math.random() < .85) return '';
    const smiles = ['😂', '😭', '🥺', '🤣', '❤️', '✨', '😍', '🙏', '😊', '🥰', '👍', '💕', '🤔'];
    const index = Math.floor(Math.random() * smiles.length);
    return '. ' + smiles[index];
}

export function generateMessage(): Message {
    const hasAttachmentFile = Math.random() > .8;
    const hasAttachmentLink = Math.random() > .5;
    return {
        id: faker.random.uuid(),
        text: faker.lorem.text().split('.').map(text => text + generateRandomEmoji()).join(''),
        createdBy: faker.random.uuid(),
        createdAt: faker.date.recent(0),
        delivered: true,
        read: true,
        attachmentFile: hasAttachmentFile ? generateAttachment() : undefined,
        attachmentLink: hasAttachmentLink ? generateAttachmentLink() : undefined,
        createdByMe: faker.random.boolean()
    }
}