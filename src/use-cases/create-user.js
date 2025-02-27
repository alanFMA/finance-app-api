import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        // verificar se o email ja está em uso
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            );

        if (userWithProvidedEmail) {
            throw new Error('The provided e-mail is already in use');
        }

        // gerar ID do usuário
        const userId = uuidv4();

        // criptografar a senha
        const hasehdPassword = await bcrypt.hash(createUserParams.password, 10);

        // inserir o usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hasehdPassword,
        };

        // chamar o repositório
        const postgresCreateUserRepository = new PostgresCreateUserRepository();

        const createdUser = await postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}
