import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserBalanceRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js';
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserBalanceUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from '../../use-cases/index.js';
import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/index.js';

import type {
    ICreateUserRepository,
    IDeleteUserRepository,
    IGetUserBalanceRepository,
    IGetUserByEmailRepository,
    IGetUserByIdRepository,
    IUpdateUserRepository,
} from '../../repositories/interfaces.js';
import type {
    ICreateUserUseCase,
    IDeleteUserUseCase,
    IGetUserBalanceUseCase,
    IGetUserByIdUseCase,
    IUpdateUserUseCase,
} from '../../use-cases/interfaces.js';

export const makeGetUserByIdController = (): GetUserByIdController => {
    const getUserByIdRepository: IGetUserByIdRepository =
        new PostgresGetUserByIdRepository();
    const getUserByIdUseCase: IGetUserByIdUseCase = new GetUserByIdUseCase(
        getUserByIdRepository
    );
    return new GetUserByIdController(getUserByIdUseCase);
};

export const makeCreateUserController = (): CreateUserController => {
    const getUserByEmailRepository: IGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();
    const createUserRepository: ICreateUserRepository =
        new PostgresCreateUserRepository();

    const createUserUseCase: ICreateUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository
    );

    return new CreateUserController(createUserUseCase);
};

export const makeUpdateUserController = (): UpdateUserController => {
    const getUserByEmailRepository: IGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();
    const updateUserRepository: IUpdateUserRepository =
        new PostgresUpdateUserRepository();

    const updateUserUseCase: IUpdateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        updateUserRepository
    );

    return new UpdateUserController(updateUserUseCase);
};

export const makeDeleteUserController = (): DeleteUserController => {
    const deleteUserRepository: IDeleteUserRepository =
        new PostgresDeleteUserRepository();
    const deleteUserUseCase: IDeleteUserUseCase = new DeleteUserUseCase(
        deleteUserRepository
    );
    return new DeleteUserController(deleteUserUseCase);
};

export const makeGetUserBalanceController = (): GetUserBalanceController => {
    const getUserBalanceRepository: IGetUserBalanceRepository =
        new PostgresGetUserBalanceRepository();
    const getUserByIdRepository: IGetUserByIdRepository =
        new PostgresGetUserByIdRepository();

    const getUserBalanceUseCase: IGetUserBalanceUseCase =
        new GetUserBalanceUseCase(
            getUserBalanceRepository,
            getUserByIdRepository
        );

    return new GetUserBalanceController(getUserBalanceUseCase);
};
