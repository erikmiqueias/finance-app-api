import 'dotenv/config.js';
import express from 'express';
import { CreateUserController } from './src/controllers/create-user.js';
import { GetUserByIdController } from './src/controllers/get-user-by-id.js';

const app = express();

app.use(express.json());

app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController();

    const { body, statusCode } = await createUserController.execute(req);

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
