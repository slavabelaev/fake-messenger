import {AttachmentLink} from "../models/AttachmentLink";
import faker from "faker";
import {
    FindAllRequest
} from "../interfaces/Service";
import {fakerService} from "./fakerService";

export const findAttachmentLinks: FindAllRequest<AttachmentLink> = async (filter, skip = 0, limit = 12) => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(fakerService.attachmentLink)
});
