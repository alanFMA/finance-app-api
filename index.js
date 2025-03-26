import 'dotenv/config.js';
import express from 'express';
import {
    CreateUserUseController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from './src/controllers/index.js';
import {
    PostgressGetUserByIdRepository,
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
} from './src/repositories/postgres/index.js';
import {
    GetUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
} from './src/use-cases/index.js';
const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdRepository = new PostgressGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).json(body);
});

app.post('/api/users', async (request, response) => {
    const getUserByEMailRepository = new PostgresGetUserByEmailRepository();
    const createUserRepository = new PostgresCreateUserRepository();

    const createUserUseCase = new CreateUserUseCase(
        getUserByEMailRepository,
        createUserRepository,
    );

    const CreateUserController = new CreateUserUseController(createUserUseCase);

    const { statusCode, body } = await CreateUserController.execute(request);

    response.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (request, response) => {
    const getUserByEMailRepository = new PostgresGetUserByEmailRepository();
    const updateUserRepository = new PostgresUpdateUserRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEMailRepository,
        updateUserRepository,
    );

    const updateUserController = new UpdateUserController(updateUserUseCase);

    const { statusCode, body } = await updateUserController.execute(request);

    response.status(statusCode).json(body);
});

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserRepository = new PostgresDeleteUserRepository();

    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);

    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    const { statusCode, body } = await deleteUserController.execute(request);
    console.log(body);
    response.status(statusCode).json(body);
});

const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));
