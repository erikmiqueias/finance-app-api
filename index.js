import 'dotenv/config.js';
import express from 'express';
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './src/factories/controllers/user.js';
import {
    makeCreateTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionController,
} from './src/factories/controllers/transaction.js';

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

app.get('/api/transactions/', async (req, res) => {
    const getTransactionsByUserIdController =
        makeGetTransactionsByUserIdController();

    const { body, statusCode } =
        await getTransactionsByUserIdController.execute(req);

    res.status(statusCode).send(body);
});

app.post('/api/transactions', async (req, res) => {
    const createTransactionController = makeCreateTransactionController();

    const { body, statusCode } = await createTransactionController.execute(req);

    res.status(statusCode).send(body);
});

app.patch('/api/transactions/:transactionId', async (req, res) => {
    const updateTransactionController = makeUpdateTransactionController();

    const { body, statusCode } = await updateTransactionController.execute(req);

    res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
