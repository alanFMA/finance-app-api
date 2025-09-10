import { prisma } from '../../../database/prisma-client.js';

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        return await prisma.users.findUnique({
            where: {
                email: email,
            },
        });
    }
}
