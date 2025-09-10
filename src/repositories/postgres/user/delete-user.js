import { prisma } from '../../../database/prisma-client.js';

export class PostgresDeleteUserRepository {
    async execute(userId) {
        try {
            return await prisma.users.delete({
                where: {
                    id: userId,
                },
            });
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
