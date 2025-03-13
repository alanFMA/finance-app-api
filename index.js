import 'dotenv/config.js';
import express from 'express';
import { CreateUserUseController } from './src/controllers/create-user.js';
import { GetUserByIdController } from './src/controllers/get-user-by-id.js';
import { UpdateUserController } from './src/controllers/update-user.js';

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
