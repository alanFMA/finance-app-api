import type {
    CreateTransactionDTO,
    Transaction,
    UpdateTransactionDTO,
    UpdateTransactionRepositoryDTO,
} from '../../types/transaction.type.js';
import type {
    UpdateUserDTO,
    User,
    UserBalanceDTO,
} from '../../types/user.types.js';

export interface IGetUserByIdRepository {
    execute(userId: string): Promise<User | null>;
}

export interface IGetUserByEmailRepository {
    execute(email: string): Promise<User | null>;
}

export interface IGetUserBalanceRepository {
    execute(userId: string): Promise<UserBalanceDTO>;
}

export interface ICreateUserRepository {
    execute(user: User): Promise<User>;
}

export interface IUpdateUserRepository {
    execute(userId: string, params: UpdateUserDTO): Promise<User>;
}

export interface IDeleteUserRepository {
    execute(userId: string): Promise<User | null>;
}

export interface IGetTransactionsByUserIdRepository {
    execute(userId: string): Promise<Transaction[]>;
}

export interface ICreateTransactionRepository {
    execute(transactionData: Transaction): Promise<Transaction>;
}

export interface IUpdateTransactionRepository {
    execute(
        transactionId: string,
        params: UpdateTransactionRepositoryDTO
    ): Promise<Transaction | null>;
}

export interface IDeleteTransactionRepository {
    execute(transactionId: string): Promise<Transaction | null>;
}

export interface IUpdateUserRepository {
    execute(userId: string, params: UpdateUserDTO): Promise<User>;
}

export interface ICreateTransactionUseCase {
    execute(params: CreateTransactionDTO): Promise<Transaction>;
}
