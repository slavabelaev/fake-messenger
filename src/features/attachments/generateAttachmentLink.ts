import faker from "faker";
import {AttachmentLink} from "./AttachmentLink";

export function generateAttachmentLink(): AttachmentLink {
    return {
        id: faker.random.uuid(),
        title: faker.company.companyName(),
        description: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        imageUrl: faker.image.avatar(),
        url: faker.internet.url()
    }
}