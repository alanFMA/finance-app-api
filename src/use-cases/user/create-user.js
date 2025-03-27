import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../../errors/user.js';

export class CreateUserUseCase {
    constructor(getUserByEMailRepository, createUserRepository) {
        this.getUserByEMailRepository = getUserByEMailRepository;
        this.createUserRepository = createUserRepository;
    }

    async execute(createUserParams) {
        // verificar se o email ja está em uso
        const userWithProvidedEmail =
            await this.getUserByEMailRepository.execute(createUserParams.email);

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
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
        const createdUser = await this.createUserRepository.execute(user);

        return createdUser;
    }
}
