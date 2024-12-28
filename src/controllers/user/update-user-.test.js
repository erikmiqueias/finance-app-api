import { faker } from '@faker-js/faker';
import { UpdateUserController } from './update-user';

describe('UpdateUserController', () => {
    class UpdateUserUseCaseStub {
        async execute(user) {
            return user;
        }
    }

    const makeSut = () => {
        const updateUserUseCase = new UpdateUserUseCaseStub();
        const sut = new UpdateUserController(updateUserUseCase);

        return { sut, updateUserUseCase };
    };

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    };

    it('Should return 200 when updating a user successfully', async () => {
        // arrange
        const { sut } = makeSut();
        // act
        const result = await sut.execute(httpRequest);
        // assert
        expect(result.statusCode).toBe(200);
    });

    it('Should return 400 when an invalid email is provided', async () => {
        // arrange
        const { sut } = makeSut();
        // act
        const result = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                email: 'invalid-email',
            },
        });
        // assert
        expect(result.statusCode).toBe(400);
    });
});
