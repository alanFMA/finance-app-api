import { UserNotFoundError } from '../../errors/user.js';

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionByUserRepository, getUserByIdRepository) {
        this.getTransactionByUserIdRepository = getTransactionByUserRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.userId);

        if (!user) {
            throw new UserNotFoundError(params.userId);
        }

        const transactions =
            await this.getTransactionByUserIdRepository.execute(params.userId);

        return transactions;
    }
}
