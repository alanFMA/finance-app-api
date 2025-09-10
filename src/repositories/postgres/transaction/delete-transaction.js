import { prisma } from '../../../database/prisma-client.js';

export class PostgresDeleteTransactionRepository {
    async execute(transactionId) {
        try {
            return await prisma.transactions.delete({
                where: {
                    id: transactionId,
                },
            });
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
