import {Message} from "../models/Message";
import faker from "faker";
import {
    FindAllRequest,
    ErrorResponse,
    DeleteResponse
} from "../interfaces/Service";
import {fakerService} from "./fakerService";
import {User} from "../models/User";

export const findMessages: FindAllRequest<Message> = async (filter, skip = 0, limit = 12) => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(fakerService.message)
});

export const insertMessage = async (createdBy: User['id'], messageText: Message['text']): Promise<Message | ErrorResponse> => {
    const message = fakerService.message();
    message.text = messageText;
    message.createdBy = createdBy;
    message.createdAt = new Date();
    return message;
};

export const deleteMessages = async (ids: Message['id'][]): Promise<DeleteResponse | ErrorResponse> => await ({
    deletedCount: ids.length
});
