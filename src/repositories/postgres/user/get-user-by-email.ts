import { prisma } from '../../../database/prisma-client.js';
import { User } from '../../../types/user.types.js';

export class PostgresGetUserByEmailRepository {
    async execute(email: string): Promise<User | null> {
        return await prisma.users.findUnique({
            where: {
                email: email,
            },
        });
    }
}
