import { prisma } from '../../../database/prisma-client.js';

export class PostgressGetUserByIdRepository {
    async execute(userId) {
        return await prisma.users.findUnique({
            where: {
                id: userId,
            },
        });
    }
}
