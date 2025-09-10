import { prisma } from '../../../database/prisma-client.js';

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        return await prisma.transactions.update({
            where: {
                id: transactionId,
            },
            data: updateTransactionParams,
        });
    }
}
