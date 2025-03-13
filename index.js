import 'dotenv/config.js';
import express from 'express';
import {
    CreateUserUseController,
    GetUserByIdController,
    UpdateUserController,
} from './src/controllers/index.js';

const app = express();

app.use(express.json());

app.post('/api/users', async (request, response) => {
    const CreateUserController = new CreateUserUseController();

    const { statusCode, body } = await CreateUserController.execute(request);

    response.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController();

    const { statusCode, body } = await updateUserController.execute(request);

    response.status(statusCode).json(body);
});

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = new GetUserByIdController();

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).json(body);
});

const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));
