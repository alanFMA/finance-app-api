import { prisma } from '../../../database/prisma-client.js';
import type { Transaction } from '../../../types/transaction.type.js';

import type { ICreateTransactionRepository } from '../../interfaces/interfaces.js';

export class PostgresCreateTransactionRepository
    implements ICreateTransactionRepository
{
    async execute(transactionData: Transaction): Promise<Transaction> {
        const createdTransaction = await prisma.transactions.create({
            data: transactionData,
        });

        return createdTransaction;
    }
}
