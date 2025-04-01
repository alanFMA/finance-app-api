import { userNotFoundResponse } from '../../controllers/helpers/index.js';

export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionByUserRepository, getUserByIdRepository) {
        this.getTransactionByUserRepository = getTransactionByUserRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.user_id);

        if (!user) {
            return userNotFoundResponse();
        }

        const transactions = await this.getTransactionByUserRepository(
            params.user_id,
        );

        return transactions;
    }
}
