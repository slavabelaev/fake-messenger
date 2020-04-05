import {Message} from "../models/Message";
import faker from "faker";
import {
    ErrorResponse,
    FetchList
} from "../interfaces/Service";
import {fakerService} from "./fakerService";
import {Chat} from "../models/Chat";

export const fetchMessages = async (skip = 0, limit = 12): Promise<FetchList<Message> | ErrorResponse> => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(fakerService.message)
});

export const addMessage = async (chatId: Chat['id'], messageText: Message['text']): Promise<Message | ErrorResponse> => {
    const message = fakerService.message();
    message.text = messageText;
    message.createdAt = new Date();
    message.createdByMe = true;
    return message;
};

export const removeMessages = async (ids?: Message['id'][]): Promise<boolean | ErrorResponse> => true;
