import { CreateUserController } from './create-user';
import { faker } from '@faker-js/faker';

describe('Create User Controller', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user;
        }
    }

    it('Should returns 201 when creating a user succesfully', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserControlelr = new CreateUserController(
            createUserUseCase,
        );

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

        const result = await createUserControlelr.execute(httpRequest);

        // assert

        expect(result.statusCode).toBe(201);
        expect(result.body).not.toBeUndefined();
        expect(result.body).not.toBeNull();
        expect(result.body).toEqual(httpRequest.body);
    });

    it('Should return 400 if first_name is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };
        // act

        const result = await createUserController.execute(httpRequest);
        // assert

        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 if last_name is not provided', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                first_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };

        const result = await createUserController.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 if email is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };

        const result = await createUserController.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 if email is not valid', async () => {
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: 'invalid_email',
                password: faker.internet.password({
                    length: 7,
                }),
            },
        };

        const result = await createUserController.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 if password is not provided', async () => {
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
            },
        };

        const result = await createUserController.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    it('Should return 400 if password is less than 6 characters', async () => {
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 5,
                }),
            },
        };

        const result = await createUserController.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    it('Should call CreateUserUseCase with correct params', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );

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

        const executeSpy = jest.spyOn(createUserUseCase, 'execute');

        await createUserController.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
        expect(executeSpy).toHaveBeenCalledTimes(1);
    });

    it('Should return 500 if CreateUserUseCase throws', async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );

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
        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });
        // act
        const result = await createUserController.execute(httpRequest);
        // assert

        expect(result.statusCode).toBe(500);
    });
});
