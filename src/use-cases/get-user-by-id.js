import { PostgressGetUserByIdRepository } from '../repositories/postgres/index.js';

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgressGetUserByIdRepository();

        const user = await getUserByIdRepository.execute(userId);

        return user;
    }
}
