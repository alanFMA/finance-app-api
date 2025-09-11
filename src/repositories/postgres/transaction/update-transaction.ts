import { prisma } from '../../../database/prisma-client.js';
import {
    Transaction,
    UpdateTransactionDTO,
} from '../../../types/transaction.type.js';

export class PostgresUpdateTransactionRepository {
    async execute(
        transactionId: string,
        updateTransactionParams: UpdateTransactionDTO
    ): Promise<Transaction | null> {
        return await prisma.transactions.update({
            where: {
                id: transactionId,
            },
            data: updateTransactionParams,
        });
    }
}
