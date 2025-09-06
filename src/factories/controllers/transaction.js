import {
    CreateTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransactionController,
} from '../../controllers/index.js';
import {
    PostgresCreateTransactionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgressGetUserByIdRepository,
    PostgresUpdateTransactionRepository,
} from '../../repositories/postgres/index.js';
import {
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase,
} from '../../use-cases/index.js';

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository();

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

export const makeGetTransactionsByUserIdController = () => {
    const getTransactionByUserIdRepository =
        new PostgresGetTransactionsByUserIdRepository();

    const getUserByIdRepository = new PostgressGetUserByIdRepository();

    const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        getTransactionByUserIdRepository,
        getUserByIdRepository,
    );

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);

    return getTransactionsByUserIdController;
};

export const makeUpdateTransactionControler = () => {
    const updateTransactionRepository =
        new PostgresUpdateTransactionRepository();

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTransactionRepository,
    );

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    );

    return updateTransactionController;
};
