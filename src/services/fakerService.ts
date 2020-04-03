import {Contact} from "../models/Contact";
import faker from "faker";
import {Message} from "../models/Message";
import {Attachment} from "../models/Attachment";
import {AuthUser} from "../models/AuthUser";
import {AttachmentLink} from "../models/AttachmentLink";

export interface FakerService {
    contact: () => Contact;
    message: () => Message;
    attachment: () => Attachment;
    attachmentLink: () => AttachmentLink;
    authUser: () => AuthUser;
}

export const fakerService: FakerService = {
    contact: () => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        return ({
            id: faker.random.uuid(),
            firstName,
            lastName,
            email: faker.internet.email(firstName, lastName),
            phoneNumber: faker.phone.phoneNumber(),
            avatarUrl: faker.image.avatar(),
            lastMessage: fakerService.message(),
            isOnline: faker.random.boolean(),
            lastVisitAt: faker.date.recent(0),
            dateOfBirth: faker.date.past(faker.random.number({ min: 18, max: 65 })),
            isFavorite: false,
            notificationsEnabled: true
        })
    },
    message: () => {
        const delivered = faker.random.boolean();
        const hasAttachmentFile = Math.random() > .8;
        const hasAttachmentLink = Math.random() > .5;
        return ({
            id: faker.random.uuid(),
            text: faker.lorem.text(),
            createdAt: faker.date.recent(0),
            delivered,
            read: delivered && faker.random.boolean(),
            attachmentFile: hasAttachmentFile ? fakerService.attachment() : undefined,
            attachmentLink: hasAttachmentLink ? fakerService.attachmentLink() : undefined
        })
    },
    attachment: () => ({
        id: faker.random.uuid(),
        type: faker.system.fileType(),
        name: faker.system.fileName(),
        size: faker.random.number(99999),
        lastModified: faker.date.past().getMilliseconds(),
        imageUrl: faker.image.avatar()
    }),
    attachmentLink: () => ({
        id: faker.random.uuid(),
        title: faker.company.companyName(),
        description: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        imageUrl: faker.image.avatar(),
        url: faker.internet.url()
    }),
    authUser: () => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        return ({
            id: faker.random.uuid(),
            firstName,
            lastName,
            email: faker.internet.email(firstName, lastName),
            phoneNumber: faker.phone.phoneNumber(),
            avatarUrl: faker.image.avatar(),
            isOnline: faker.random.boolean(),
            dateOfBirth: faker.date.past(faker.random.number({ min: 18, max: 65 }))
        })
    }
};
