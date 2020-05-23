import {Message} from "./Message";
import faker from "faker";
import {
    ErrorResponse,
    FetchList
} from "../../common/interfaces/Service";
import {Chat} from "../chat/Chat";
import {generateMessage} from "./generateMessage";

export const fetchMessages = async (skip = 0, limit = 12): Promise<FetchList<Message> | ErrorResponse> => await ({
    count: faker.random.number({ min: 12, max: 9999 }),
    items: Array(limit).fill(null).map(generateMessage)
});

export const addMessage = async (chatId: Chat['id'], messageText: Message['text']): Promise<Message | ErrorResponse> => {
    const message = generateMessage();
    message.text = messageText;
    message.attachmentFile = undefined;
    message.attachmentLink = undefined;
    message.createdAt = new Date();
    message.createdByMe = true;
    return message;
};

export const removeMessages = async (ids?: Message['id'][]): Promise<boolean | ErrorResponse> => true;
