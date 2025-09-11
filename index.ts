import 'dotenv/config.js';
import express from 'express';
import type { Request, Response } from 'express';
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './src/factories/controllers/user.js';
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionsByUserIdController,
    makeUpdateTransactionController,
} from './src/factories/controllers/transaction.js';

const app = express();
app.use(express.json());

app.get(
    '/api/users/:userId',
    async (request: Request<{ userId: string }>, response: Response) => {
        const getUserByIdController = makeGetUserByIdController();

        const { statusCode, body } = await getUserByIdController.execute({
            params: request.params,
        });
        response.status(statusCode).json(body);
    }
);

app.get(
    '/api/users/:userId/balance',
    async (request: Request<{ userId: string }>, response: Response) => {
        const getUserBalanceController = makeGetUserBalanceController();
        const { statusCode, body } = await getUserBalanceController.execute({
            params: request.params,
        });
        response.status(statusCode).json(body);
    }
);

app.post('/api/users', async (request: Request, response: Response) => {
    const createUserController = makeCreateUserController();
    const { statusCode, body } = await createUserController.execute({
        body: request.body,
    });
    response.status(statusCode).json(body);
});

app.patch(
    '/api/users/:userId',
    async (request: Request<{ userId: string }>, response: Response) => {
        const updateUserController = makeUpdateUserController();
        const { statusCode, body } = await updateUserController.execute({
            body: request.body,
            params: request.params,
        });
        response.status(statusCode).json(body);
    }
);

app.delete(
    '/api/users/:userId',
    async (request: Request<{ userId: string }>, response: Response) => {
        const deleteUserController = makeDeleteUserController();
        const { statusCode, body } = await deleteUserController.execute({
            params: request.params,
        });
        response.status(statusCode).json(body);
    }
);

app.get(
    '/api/transactions',
    async (
        request: Request<any, any, any, { userId: string }>,
        response: Response
    ) => {
        const getTransactionsByUserIdController =
            makeGetTransactionsByUserIdController();
        const { statusCode, body } =
            await getTransactionsByUserIdController.execute({
                query: request.query,
            });
        response.status(statusCode).json(body);
    }
);

app.post('/api/transactions', async (request: Request, response: Response) => {
    const createTransactionController = makeCreateTransactionController();
    const { statusCode, body } = await createTransactionController.execute({
        body: request.body,
    });
    response.status(statusCode).json(body);
});

app.patch(
    '/api/transactions/:transactionId',
    async (request: Request<{ transactionId: string }>, response: Response) => {
        const updateTransactionController = makeUpdateTransactionController();
        const { statusCode, body } = await updateTransactionController.execute({
            body: request.body,
            params: request.params,
        });
        response.status(statusCode).json(body);
    }
);

app.delete(
    '/api/transactions/:transactionId',
    async (request: Request<{ transactionId: string }>, response: Response) => {
        const deleteTransactionController = makeDeleteTransactionController();
        const { statusCode, body } = await deleteTransactionController.execute({
            params: request.params,
        });
        response.status(statusCode).json(body);
    }
);

const port = process.env.PORT || 8000;
app.listen(port, () =>
    console.log(`🚀 Server running at http://localhost:${port}`)
);
