import type {
    CreateTransactionPayloadDTO,
    Transaction,
    UpdateTransactionPayloadDTO,
} from '../types/transaction.type.js';
import {
    CreateUserPayloadDTO,
    UpdateUserPayloadDTO,
    User,
    UserBalanceDTO,
} from '../types/user.types.js';

export interface ICreateTransactionUseCase {
    execute(params: CreateTransactionPayloadDTO): Promise<Transaction>;
}

export interface IDeleteTransactionUseCase {
    execute(transactionId: string): Promise<Transaction | null>;
}

export interface IGetTransactionsByUserIdUseCase {
    execute(params: { userId: string }): Promise<Transaction[]>;
}

export interface IUpdateTransactionUseCase {
    execute(
        transactionId: string,
        params: UpdateTransactionPayloadDTO
    ): Promise<Transaction | null>;
}

export interface ICreateUserUseCase {
    execute(params: CreateUserPayloadDTO): Promise<User>;
}

export interface IDeleteUserUseCase {
    execute(userId: string): Promise<User | null>;
}

export interface IGetUserBalanceUseCase {
    execute(userId: string): Promise<UserBalanceDTO>;
}

export interface IGetUserByIdUseCase {
    execute(userId: string): Promise<User | null>;
}

export interface IUpdateUserUseCase {
    execute(userId: string, params: UpdateUserPayloadDTO): Promise<User>;
}
