import { UserNotFoundError } from '../../errors/user.js';
import type {
    IGetUserBalanceRepository,
    IGetUserByIdRepository,
} from '../../repositories/interfaces.js';
import type { UserBalanceDTO } from '../../types/user.types.js';

export class GetUserBalanceUseCase {
    private readonly getUserBalanceRepository: IGetUserBalanceRepository;
    private readonly getUserByIdRepository: IGetUserByIdRepository;

    constructor(
        getUserBalanceRepository: IGetUserBalanceRepository,
        getUserByIdRepository: IGetUserByIdRepository
    ) {
        this.getUserBalanceRepository = getUserBalanceRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(userId: string): Promise<UserBalanceDTO> {
        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError(userId);
        }

        const balance = await this.getUserBalanceRepository.execute(userId);

        return balance;
    }
}
