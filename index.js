import 'dotenv/config.js';
import express from 'express';
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
} from './src/controllers/index.js';

const app = express();

app.use(express.json());

app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController();

    const { body, statusCode } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = new UpdateUserController();

    const { body, statusCode } = await updateUserController.execute(req);

    res.status(statusCode).send(body);
});

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = new GetUserByIdController();

    const { body, statusCode } = await getUserByIdController.execute(req);

    res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
