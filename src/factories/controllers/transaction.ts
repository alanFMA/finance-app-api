import {
    CreateTransactionController,
    DeleteTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransactionController,
} from '../../controllers/index.js';
import {
    ICreateTransactionRepository,
    IDeleteTransactionRepository,
    IGetTransactionsByUserIdRepository,
    IGetUserByIdRepository,
    IUpdateTransactionRepository,
} from '../../repositories/interfaces.js';
import {
    PostgresCreateTransactionRepository,
    PostgresDeleteTransactionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresUpdateTransactionRepository,
    PostgresGetUserByIdRepository,
} from '../../repositories/postgres/index.js';
import {
    ICreateTransactionUseCase,
    IDeleteTransactionUseCase,
    IGetTransactionsByUserIdUseCase,
    IUpdateTransactionUseCase,
} from '../../use-cases/interfaces.js';
import {
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase,
} from '../../use-cases/index.js';

export const makeCreateTransactionController =
    (): CreateTransactionController => {
        const createTransactionRepository: ICreateTransactionRepository =
            new PostgresCreateTransactionRepository();

        const getUserByIdRepository: IGetUserByIdRepository =
            new PostgresGetUserByIdRepository();
        const createTransactionUseCase: ICreateTransactionUseCase =
            new CreateTransactionUseCase(
                createTransactionRepository,
                getUserByIdRepository
            );

        const createTransactionController = new CreateTransactionController(
            createTransactionUseCase
        );

        return createTransactionController;
    };

export const makeGetTransactionsByUserIdController =
    (): GetTransactionsByUserIdController => {
        const getTransactionByUserIdRepository: IGetTransactionsByUserIdRepository =
            new PostgresGetTransactionsByUserIdRepository();

        const getUserByIdRepository: IGetUserByIdRepository =
            new PostgresGetUserByIdRepository();

        const getTransactionsByUserIdUseCase: IGetTransactionsByUserIdUseCase =
            new GetTransactionsByUserIdUseCase(
                getTransactionByUserIdRepository,
                getUserByIdRepository
            );

        const getTransactionsByUserIdController =
            new GetTransactionsByUserIdController(
                getTransactionsByUserIdUseCase
            );

        return getTransactionsByUserIdController;
    };

export const makeUpdateTransactionController =
    (): UpdateTransactionController => {
        const updateTransactionRepository: IUpdateTransactionRepository =
            new PostgresUpdateTransactionRepository();

        const updateTransactionUseCase: IUpdateTransactionUseCase =
            new UpdateTransactionUseCase(updateTransactionRepository);

        const updateTransactionController = new UpdateTransactionController(
            updateTransactionUseCase
        );

        return updateTransactionController;
    };

export const makeDeleteTransactionController =
    (): DeleteTransactionController => {
        const deleteTransactionRepository: IDeleteTransactionRepository =
            new PostgresDeleteTransactionRepository();

        const deleteTransactionUseCase: IDeleteTransactionUseCase =
            new DeleteTransactionUseCase(deleteTransactionRepository);

        const deleteTransactionController = new DeleteTransactionController(
            deleteTransactionUseCase
        );

        return deleteTransactionController;
    };
