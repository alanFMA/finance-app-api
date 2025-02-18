import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user';

export class CreateUserUseCase {
    async execut(createUserParams) {
        // verificar se o email ja está em uso

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

        return await postgresCreateUserRepository.createUser(user);
    }
}
