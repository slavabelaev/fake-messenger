import {Attachment} from "./Attachment";
import faker from "faker";
import {ErrorResponse, SuccessResponse} from "../../common/interfaces/Service";
import {generateAttachment} from "./generateAttachment";

export const fetchAttachments = async (skip = 0, limit = 12): Promise<SuccessResponse<Attachment> | ErrorResponse> => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(generateAttachment)
});
