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

        // act

        const result = await createUserControlelr.execute(httpRequest);

        // assert

        expect(result.statusCode).toBe(201);
        expect(result.body).not.toBeUndefined();
        expect(result.body).not.toBeNull();
    });
});
