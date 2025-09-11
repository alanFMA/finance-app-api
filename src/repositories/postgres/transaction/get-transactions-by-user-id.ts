import { prisma } from '../../../database/prisma-client.js';
import type { Transaction } from '../../../types/transaction.type.js';
import type { IGetTransactionsByUserIdRepository } from '../../interfaces/interfaces.js';

export class PostgresGetTransactionsByUserIdRepository
    implements IGetTransactionsByUserIdRepository
{
    async execute(userId: string): Promise<Transaction[]> {
        const transactions = await prisma.transactions.findMany({
            where: {
                user_id: userId,
            },
        });
        return transactions;
    }
}
