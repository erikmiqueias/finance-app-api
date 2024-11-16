import 'dotenv/config.js';
import express from 'express';
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './src/factories/controllers/user.js';
import { makeCreateTransactionController } from './src/factories/controllers/transaction.js';

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = makeGetUserByIdController();

    const { body, statusCode } = await getUserByIdController.execute(req);

    res.status(statusCode).send(body);
});

app.post('/api/users', async (req, res) => {
    const createUserController = makeCreateUserController();

    const { body, statusCode } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = makeUpdateUserController();

    const { body, statusCode } = await updateUserController.execute(req);
    res.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserController = makeDeleteUserController();
    const { body, statusCode } = await deleteUserController.execute(req);

    res.status(statusCode).send(body);
});

app.post('/api/transactions', async (req, res) => {
    const createTransactionController = makeCreateTransactionController();

    const { body, statusCode } = await createTransactionController.execute(req);

    res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
