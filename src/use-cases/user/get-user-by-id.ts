import type { IGetUserByIdRepository } from '../../repositories/interfaces.js';
import type { User } from '../../types/user.types.js';

export class GetUserByIdUseCase {
    private readonly getUserByIdRepository: IGetUserByIdRepository;

    constructor(getUserByIdRepository: IGetUserByIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(userId: string): Promise<User | null> {
        const user = await this.getUserByIdRepository.execute(userId);
        return user;
    }
}
