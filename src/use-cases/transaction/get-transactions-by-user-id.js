import { UserNotFoundError } from '../../errors/user.js';

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionByUserRepository, getUserByIdRepository) {
        this.getTransactionByUserRepository = getTransactionByUserRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.user_id);

        if (!user) {
            throw new UserNotFoundError(params.user_id);
        }

        const transactions = await this.getTransactionByUserRepository(
            params.user_id,
        );

        return transactions;
    }
}
