import {AttachmentLink} from "./AttachmentLink";
import faker from "faker";
import {ErrorResponse, SuccessResponse} from "../../common/interfaces/Service";
import {generateAttachmentLink} from "./generateAttachmentLink";

export const fetchAttachmentLinks = async (skip = 0, limit = 12): Promise<SuccessResponse<AttachmentLink> | ErrorResponse> => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(generateAttachmentLink)
});
