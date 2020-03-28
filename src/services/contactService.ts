import {Contact} from "../models/Contact";
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

export const findContacts: FindAllRequest<Contact> = async (filter, skip = 0, limit = 12) => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(fakerService.contact)
});

export const findContact: FindRequest<Contact> = async (id) => await fakerService.contact();

export const insertContact: InsertRequest<Contact> = async (item) => await ({
    insertedIds: [item.id]
});

export const insertContacts: InsertManyRequest<Contact> = async (items) => await ({
    insertedIds: items.map(item => item.id)
});

export const updateContact: UpdateRequest<Contact> = async (item) => await ({
    modifiedCount: 1
});

export const updateContacts: UpdateManyRequest<Contact> = async (items) => await ({
    modifiedCount: items.length
});

export const deleteContact: DeleteOneRequest<Contact> = async (filter) => await ({
    deletedCount: 1
});

export const deleteContacts: DeleteManyRequest<Contact> =  async (filter) => await ({
    deletedCount: 2
});
