import { prisma } from '../../../database/prisma-client.js';
import type { User } from '../../../types/user.types.js';
import type { IDeleteUserRepository } from '../../interfaces/interfaces.js';

export class PostgresDeleteUserRepository implements IDeleteUserRepository {
    async execute(userId: string): Promise<User | null> {
        try {
            const deletedUser = await prisma.users.delete({
                where: { id: userId },
            });
            return deletedUser;
        } catch (error) {
            return null;
        }
    }
}
