import {Contact} from "../models/Contact";
import faker from "faker";
import {fakerService} from "./fakerService";
import {ErrorResponse, FetchList} from "../interfaces/Service";

export const fetchContacts = async (skip = 0, limit = 12): Promise<FetchList<Contact> | ErrorResponse> => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(fakerService.contact)
});

export const removeContact = async (id: Contact['id']): Promise<boolean | ErrorResponse> => true;

export const addContact = async (id: Contact['id']): Promise<boolean | ErrorResponse> => true;