import 'dotenv/config.js';
import express from 'express';
import {
    CreateUserUseController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from './src/controllers/index.js';

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = new GetUserByIdController();

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).json(body);
});

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

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = new DeleteUserController();

    const { statusCode, body } = await deleteUserController.execute(request);
    console.log(body);
    response.status(statusCode).json(body);
});

const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));
