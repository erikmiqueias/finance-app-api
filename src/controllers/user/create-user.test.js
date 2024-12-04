import { EmailAlreadyInUseError } from '../../errors/user';
import { CreateUserController } from './create-user';
import { faker } from '@faker-js/faker';

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user;
        }
    }

    const makeSut = () => {
        const createUserUseCase = new CreateUserUseCaseStub();
        const sut = new CreateUserController(createUserUseCase);
        return { sut, createUserUseCase };
    };
    const httpRequest = {
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 7,
            }),
        },
    };

    it('Should returns 201 when creating a user succesfully', async () => {
        // arrange
        const { sut } = makeSut();

        const result = await sut.execute(httpRequest);

        // assert

        expect(result.statusCode).toBe(201);
        expect(result.body).not.toBeUndefined();
        expect(result.body).not.toBeNull();
        expect(result.body).toEqual(httpRequest.body);
    });

    it('Should return 400 if first_name is not provided', async () => {
        // arrange
        const { sut } = makeSut();

        // act

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                first_name: undefined,
            },
        });
        // assert

        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 if last_name is not provided', async () => {
        // arrange
        const { sut } = makeSut();

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                last_name: undefined,
            },
        });

        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 if email is not provided', async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: undefined,
            },
        });

        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 if email is not valid', async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                email: 'invalid_email',
            },
        });

        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 if password is not provided', async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: undefined,
            },
        });

        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 if password is less than 6 characters', async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                password: faker.internet.password({
                    length: 5,
                }),
            },
        });

        expect(result.statusCode).toBe(400);
    });

    it('Should call CreateUserUseCase with correct params', async () => {
        // arrange
        const { sut, createUserUseCase } = makeSut();

        const executeSpy = jest.spyOn(createUserUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
        expect(executeSpy).toHaveBeenCalledTimes(1);
    });

    it('Should return 500 if CreateUserUseCase throws', async () => {
        // arrange
        const { sut, createUserUseCase } = makeSut();

        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });
        // act
        const result = await sut.execute(httpRequest);
        // assert

        expect(result.statusCode).toBe(500);
    });

    it('Should return 400 if CreateUserUseCase throws EmailIsAlreadyInUseError', async () => {
        // arrange
        const { sut, createUserUseCase } = makeSut();

        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new EmailAlreadyInUseError('Email is already in use');
        });
        // act
        const result = await sut.execute(httpRequest);
        // assert

        expect(result.statusCode).toBe(400);
    });
});
