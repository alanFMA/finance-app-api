import { prisma } from '../../../database/prisma-client.js';

export class PostgresGetTransactionsByUserIdRepository {
    async execute(userId) {
        return await prisma.transactions.findMany({
            where: {
                user_id: userId,
            },
        });
    }
}
