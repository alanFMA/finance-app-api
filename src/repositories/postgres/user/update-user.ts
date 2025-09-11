import { prisma } from '../../../database/prisma-client.js';
import { UpdateUserDTO, User } from '../../../types/user.types.js';

export class PostgresUpdateUserRepository {
    async execute(
        userId: string,
        updateUserParams: UpdateUserDTO
    ): Promise<User> {
        return await prisma.users.update({
            where: {
                id: userId,
            },
            data: updateUserParams,
        });
    }
}
