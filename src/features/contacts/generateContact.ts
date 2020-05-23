import faker from "faker";
import {generateMessage} from "../messages/generateMessage";
import {Contact} from "./Contact";

export function generateContact(): Contact {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    return {
        id: faker.random.uuid(),
        firstName,
        lastName,
        email: faker.internet.email(firstName, lastName),
        phoneNumber: faker.phone.phoneNumber(),
        avatarUrl: faker.image.avatar(),
        lastMessage: generateMessage(),
        isOnline: faker.random.boolean(),
        lastVisitAt: faker.date.recent(0),
        dateOfBirth: faker.date.past(faker.random.number({ min: 18, max: 65 })),
        notificationsEnabled: true,
        bio: faker.lorem.sentence()
    }
}