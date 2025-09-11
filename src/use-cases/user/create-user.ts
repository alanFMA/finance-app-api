import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../../errors/user.js';
import type {
    IGetUserByEmailRepository,
    ICreateUserRepository,
} from '../../repositories/interfaces.js';
import type { CreateUserDTO, User } from '../../types/user.types.js';

export class CreateUserUseCase {
    private readonly getUserByEmailRepository: IGetUserByEmailRepository;
    private readonly createUserRepository: ICreateUserRepository;

    constructor(
        getUserByEmailRepository: IGetUserByEmailRepository,
        createUserRepository: ICreateUserRepository
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
    }

    async execute(createUserParams: CreateUserDTO): Promise<User> {
        const userWithProvidedEmail =
            await this.getUserByEmailRepository.execute(createUserParams.email);

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        const userId = uuidv4();

        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        const userToCreate: User = {
            id: userId,
            first_name: createUserParams.first_name || '',
            last_name: createUserParams.last_name || '',
            email: createUserParams.email,
            password: hashedPassword,
        };

        const createdUser = await this.createUserRepository.execute(
            userToCreate
        );

        return createdUser;
    }
}
