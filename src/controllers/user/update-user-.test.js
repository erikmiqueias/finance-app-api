import { faker } from '@faker-js/faker';
import { UpdateUserController } from './update-user';
import { EmailAlreadyInUseError } from '../../errors/user';

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

    it('Should return 400 when an invalid password is provided', async () => {
        // arrange
        const { sut } = makeSut();
        // act
        const result = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                password: faker.internet.password({
                    length: 5,
                }),
            },
        });
        // assert
        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 when an invalid id is provided', async () => {
        // arrange
        const { sut } = makeSut();
        // act
        const result = await sut.execute({
            params: {
                userId: 'invalid_id',
            },
            body: httpRequest.body,
        });
        // assert
        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 when an unallowed field is provided', async () => {
        // arrange
        const { sut } = makeSut();
        // act
        const result = await sut.execute({
            params: httpRequest.params,
            body: {
                ...httpRequest.body,
                unallowed_field: faker.lorem.word(),
            },
        });
        // assert
        expect(result.statusCode).toBe(400);
    });

    it('Should return 500 if UpdateUserUseCase throws with generic error', async () => {
        // arrange
        const { sut, updateUserUseCase } = makeSut();
        jest.spyOn(updateUserUseCase, 'execute').mockRejectedValue(new Error());
        // act
        const result = await sut.execute(httpRequest);
        // assert
        expect(result.statusCode).toBe(500);
    });

    it('Should return 400 if UpdateUserUseCase throws EmailAlreadyInUseError', async () => {
        // arrange
        const { sut, updateUserUseCase } = makeSut();
        jest.spyOn(updateUserUseCase, 'execute').mockRejectedValue(
            new EmailAlreadyInUseError(faker.internet.email()),
        );
        // act
        const result = await sut.execute(httpRequest);
        // assert
        expect(result.statusCode).toBe(400);
    });
});
