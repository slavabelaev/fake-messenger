import {AttachmentLink} from "./AttachmentLink";
import faker from "faker";
import {ErrorResponse, FetchList} from "../../common/interfaces/Service";
import {generateAttachmentLink} from "./generateAttachmentLink";

export const fetchAttachmentLinks = async (skip = 0, limit = 12): Promise<FetchList<AttachmentLink> | ErrorResponse> => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(generateAttachmentLink)
});
