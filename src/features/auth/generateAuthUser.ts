import faker from "faker";

export function generateAuthUser() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    return ({
        id: faker.random.uuid(),
        firstName,
        lastName,
        email: faker.internet.email(firstName, lastName),
        phoneNumber: faker.phone.phoneNumber(),
        avatarUrl: faker.image.avatar(),
        isOnline: faker.random.boolean(),
        dateOfBirth: faker.date.past(faker.random.number({ min: 18, max: 65 })),
        bio: faker.lorem.sentence()
    })
}