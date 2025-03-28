import { CreateTransactionController } from '../../controllers/index.js';
import {
    PostgresCreateTransactionRepository,
    PostgressGetUserByIdRepository,
} from '../../repositories/postgres/index.js';
import { CreateTransactionUseCase } from '../../use-cases/index.js';

export const makeCreateTransactionController = () => {
    const createTransactionRepository = new PostgresCreateTransactionRepository(
        XMLDocument,
    );

    const getUserByIdRepository = new PostgressGetUserByIdRepository();

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    );

    return createTransactionController;
};
