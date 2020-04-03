import {Attachment} from "../models/Attachment";
import faker from "faker";
import {fakerService} from "./fakerService";
import {ErrorResponse, FetchList} from "../interfaces/Service";

export const fetchAttachments = async (skip = 0, limit = 12): Promise<FetchList<Attachment> | ErrorResponse> => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(fakerService.attachment)
});
