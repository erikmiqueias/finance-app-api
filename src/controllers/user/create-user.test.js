import { CreateUserController } from './create-user';

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
                first_name: 'John',
                last_name: 'Doe',
                email: 'teste@gmail.com',
                password: '1234567',
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
                last_name: 'Doe',
                email: 'teste@gmail.com',
                password: '1234567',
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
                first_name: 'John',
                email: '',
                password: '1234567',
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
                first_name: 'John',
                last_name: 'Doe',
                password: '1234567',
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
                first_name: 'John',
                last_name: 'Doe',
                email: 'john',
                password: '1234567',
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
                first_name: 'John',
                last_name: 'Doe',
                email: 'john',
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
                first_name: 'John',
                last_name: 'Doe',
                email: 'john',
                password: '123',
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
                first_name: 'John',
                last_name: 'Doe',
                email: 'john@email.com',
                password: '1234567',
            },
        };

        const executeSpy = jest.spyOn(createUserUseCase, 'execute');

        await createUserController.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
        expect(executeSpy).toHaveBeenCalledTimes(1);
    });
});
