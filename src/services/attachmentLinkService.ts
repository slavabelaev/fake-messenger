import {AttachmentLink} from "../models/AttachmentLink";
import faker from "faker";
import {fakerService} from "./fakerService";
import {ErrorResponse, FetchList} from "../interfaces/Service";

export const fetchAttachmentLinks = async (skip = 0, limit = 12): Promise<FetchList<AttachmentLink> | ErrorResponse> => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(fakerService.attachmentLink)
});
