import {Contact} from "./Contact";
import faker from "faker";
import {ErrorResponse, FetchList} from "../../common/interfaces/Service";
import {generateContact} from "./generateContact";

export const fetchContacts = async (skip = 0, limit = 12): Promise<FetchList<Contact> | ErrorResponse> => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(generateContact)
});

export const removeContact = async (id: Contact['id']): Promise<boolean | ErrorResponse> => true;

export const addContact = async (id: Contact['id']): Promise<boolean | ErrorResponse> => true;