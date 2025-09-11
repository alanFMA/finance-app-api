import { prisma } from '../../../database/prisma-client.js';
import { User } from '../../../types/user.types.js';

export class PostgresGetUserByIdRepository {
    async execute(userId: string): Promise<User | null> {
        return await prisma.users.findUnique({
            where: {
                id: userId,
            },
        });
    }
}
