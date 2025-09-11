import type { transactions, Prisma } from '../../src/generated/prisma/index.js';
import type {
    CreateTransactionSchemaType,
    UpdateTransactionSchemaType,
} from '../schemas/index.js';

export type Transaction = transactions;

export type CreateTransactionDTO = Prisma.transactionsUncheckedCreateInput;

export type UpdateTransactionDTO = Prisma.usersUpdateInput;

export interface GetTransactionsByUserIdParams {
    userId: string;
}

export type CreateTransactionPayloadDTO = CreateTransactionSchemaType;

export type UpdateTransactionPayloadDTO = UpdateTransactionSchemaType;

export type UpdateTransactionRepositoryDTO = Prisma.transactionsUpdateInput;
