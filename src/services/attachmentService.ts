import {Attachment} from "../models/Attachment";
import faker from "faker";
import {
    FindAllRequest
} from "../interfaces/Service";
import {fakerService} from "./fakerService";

export const findAttachments: FindAllRequest<Attachment> = async (filter, skip = 0, limit = 12) => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(fakerService.attachment)
});
