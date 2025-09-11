import { EmailAlreadyInUseError } from '../../errors/user.js';
import bcrypt from 'bcrypt';
import type {
    IGetUserByEmailRepository,
    IUpdateUserRepository,
} from '../../repositories/interfaces.js';
import type {
    UpdateUserPayloadDTO,
    UpdateUserDTO,
    User,
} from '../../types/user.types.js';

export class UpdateUserUseCase {
    private readonly getUserByEmailRepository: IGetUserByEmailRepository;
    private readonly updateUserRepository: IUpdateUserRepository;

    constructor(
        getUserByEmailRepository: IGetUserByEmailRepository,
        updateUserRepository: IUpdateUserRepository
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.updateUserRepository = updateUserRepository;
    }

    async execute(userId: string, params: UpdateUserPayloadDTO): Promise<User> {
        if (params.email) {
            const userWithProvidedEmail =
                await this.getUserByEmailRepository.execute(params.email);

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(params.email);
            }
        }

        const dataToUpdate: UpdateUserDTO = { ...params };

        if (params.password) {
            const hashedPassword = await bcrypt.hash(params.password, 10);
            dataToUpdate.password = hashedPassword;
        }

        const updatedUser = await this.updateUserRepository.execute(
            userId,
            dataToUpdate
        );

        return updatedUser;
    }
}
