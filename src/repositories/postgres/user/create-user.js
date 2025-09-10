import { prisma } from '../../../database/prisma-client.js';

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        const user = await prisma.users.create({
            data: {
                id: createUserParams.id,
                first_name: createUserParams.first_name,
                last_name: createUserParams.last_name,
                email: createUserParams.email,
                password: createUserParams.password,
            },
        });

        return user;
    }
}
