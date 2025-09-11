import { prisma } from '../../../database/prisma-client.js';
import type { Transaction } from '../../../types/transaction.type.js';
import type { IDeleteTransactionRepository } from '../../interfaces/interfaces.js';

export class PostgresDeleteTransactionRepository
    implements IDeleteTransactionRepository
{
    async execute(transactionId: string): Promise<Transaction | null> {
        try {
            const deletedTransaction = await prisma.transactions.delete({
                where: {
                    id: transactionId,
                },
            });
            return deletedTransaction;
        } catch (error) {
            return null;
        }
    }
}
