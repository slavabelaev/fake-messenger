import {Contact} from "../models/Contact";
import faker from "faker";
import {Message} from "../models/Message";
import {Attachment} from "../models/Attachment";
import {AuthUser} from "../models/AuthUser";

export interface FakerService {
    contact: () => Contact;
    message: () => Message;
    attachment: () => Attachment;
    authUser: () => AuthUser;
}

export const fakerService: FakerService = {
    contact: () => ({
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatarUrl: faker.image.avatar(),
        lastMessage: fakerService.message(),
        isOnline: faker.random.boolean(),
        lastVisitAt: faker.date.recent(0)
    }),
    message: () => ({
        id: faker.random.uuid(),
        text: faker.lorem.text(),
        createdAt: faker.date.recent(0),
        delivered: faker.random.boolean(),
        read: faker.random.boolean()
    }),
    attachment: () => ({
        id: faker.random.uuid(),
        type: faker.system.fileType(),
        name: faker.system.fileName(),
        size: faker.random.number(99999),
        lastModified: faker.date.past().getMilliseconds(),
        imageUrl: faker.image.avatar()
    }),
    authUser: () => ({
        id: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatarUrl: faker.image.avatar(),
        isOnline: faker.random.boolean()
    })
};
