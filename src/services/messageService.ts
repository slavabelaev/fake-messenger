import {Message} from "../models/Message";
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

export const findMessages: FindAllRequest<Message> = async (filter, skip = 0, limit = 12) => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(fakerService.message)
});

export const findMessage: FindRequest<Message> = async (id) => await fakerService.message();

export const insertMessage: InsertRequest<Message> = async (item) => await ({
    insertedIds: [item.id]
});

export const insertMessages: InsertManyRequest<Message> = async (items) => await ({
    insertedIds: items.map(item => item.id)
});

export const updateMessage: UpdateRequest<Message> = async (item) => await ({
    modifiedCount: 1
});

export const updateMessages: UpdateManyRequest<Message> = async (items) => await ({
    modifiedCount: items.length
});

export const deleteMessage: DeleteOneRequest<Message> = async (filter) => await ({
    deletedCount: 1
});

export const deleteMessages: DeleteManyRequest<Message> =  async (filter) => await ({
    deletedCount: 2
});
