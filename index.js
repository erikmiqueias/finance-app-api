import 'dotenv/config.js';
import express from 'express';
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
} from './src/controllers/index.js';
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js';
import { CreateUserUseCase, GetUserByIdUseCase } from './src/use-case/index.js';
import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from './src/repositories/postgres/get-user-by-email.js';

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
    const updateUserController = new UpdateUserController();

    const { body, statusCode } = await updateUserController.execute(req);

    res.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserController = new DeleteUserController();

    const { body, statusCode } = await deleteUserController.execute(req);

    res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
