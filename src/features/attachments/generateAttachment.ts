import faker from "faker";
import {Attachment} from "./Attachment";

export function generateAttachment(): Attachment {
    return {
        id: faker.random.uuid(),
        type: faker.system.fileType(),
        name: faker.system.fileName(),
        size: faker.random.number(99999),
        lastModified: faker.date.past().getMilliseconds(),
        imageUrl: faker.image.avatar()
    }
}