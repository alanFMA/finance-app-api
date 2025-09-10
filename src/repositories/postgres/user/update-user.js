import { prisma } from '../../../database/prisma-client.js';

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        return await prisma.users.update({
            where: {
                id: userId,
            },
            data: updateUserParams,
        });
    }
}
