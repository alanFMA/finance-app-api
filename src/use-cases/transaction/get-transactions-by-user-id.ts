import { UserNotFoundError } from '../../errors/user.js';
import type {
    IGetTransactionsByUserIdRepository,
    IGetUserByIdRepository,
} from '../../repositories/interfaces.js';
import type { GetTransactionsByUserIdParams } from '../../types/transaction.type.js';
import type { Transaction } from '../../types/transaction.type.js';

export class GetTransactionsByUserIdUseCase {
    private readonly getTransactionByUserIdRepository: IGetTransactionsByUserIdRepository;
    private readonly getUserByIdRepository: IGetUserByIdRepository;

    constructor(
        getTransactionByUserRepository: IGetTransactionsByUserIdRepository,
        getUserByIdRepository: IGetUserByIdRepository
    ) {
        this.getTransactionByUserIdRepository = getTransactionByUserRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(
        params: GetTransactionsByUserIdParams
    ): Promise<Transaction[]> {
        const user = await this.getUserByIdRepository.execute(params.userId);

        if (!user) {
            throw new UserNotFoundError(params.userId);
        }

        const transactions =
            await this.getTransactionByUserIdRepository.execute(params.userId);

        return transactions;
    }
}
