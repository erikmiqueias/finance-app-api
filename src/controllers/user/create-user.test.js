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
});
