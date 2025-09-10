import { prisma } from '../../../database/prisma-client.js';

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        return await prisma.transactions.create({
            data: createTransactionParams,
        });
    }
}
