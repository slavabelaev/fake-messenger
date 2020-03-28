import {Attachment} from "../models/Attachment";
import faker from "faker";
import {
    DeleteManyRequest,
    DeleteOneRequest,
    FindAllRequest,
    FindRequest,
    InsertRequest,
    InsertManyRequest,
    UpdateRequest,
    UpdateManyRequest
} from "../interfaces/Service";
import {fakerService} from "./fakerService";

export const findAttachments: FindAllRequest<Attachment> = async (filter, skip = 0, limit = 12) => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(fakerService.attachment)
});

export const findAttachment: FindRequest<Attachment> = async (id) => await fakerService.attachment();

export const insertAttachment: InsertRequest<Attachment> = async (item) => await ({
    insertedIds: [item.id]
});

export const insertAttachments: InsertManyRequest<Attachment> = async (items) => await ({
    insertedIds: items.map(item => item.id)
});

export const updateAttachment: UpdateRequest<Attachment> = async (item) => await ({
    modifiedCount: 1
});

export const updateAttachments: UpdateManyRequest<Attachment> = async (items) => await ({
    modifiedCount: items.length
});

export const deleteAttachment: DeleteOneRequest<Attachment> = async (filter) => await ({
    deletedCount: 1
});

export const deleteAttachments: DeleteManyRequest<Attachment> =  async (filter) => await ({
    deletedCount: 2
});
