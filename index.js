import 'dotenv/config.js';
import express from 'express';
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
} from './src/controllers/index.js';
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js';
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from './src/use-case/index.js';
import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from './src/repositories/postgres/get-user-by-email.js';
import { PostgresUpdateUserRepository } from './src/repositories/postgres/update-user.js';
import { PostgresDeleteUserRepository } from './src/repositories/postgres/delete-user.js';

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (req, res) => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    );
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    const { body, statusCode } = await getUserByIdController.execute(req);

    res.status(statusCode).send(body);
});

app.post('/api/users', async (req, res) => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();

    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    const { body, statusCode } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (req, res) => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const updateUserRepository = new PostgresUpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        updateUserRepository,
        getUserByEmailRepository,
    );

    const updateUserController = new UpdateUserController(updateUserUseCase);

    const { body, statusCode } = await updateUserController.execute(req);
    res.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);

    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    const { body, statusCode } = await deleteUserController.execute(req);

    res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
