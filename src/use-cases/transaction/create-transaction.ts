import { v4 as uuidv4 } from 'uuid';
import { UserNotFoundError } from '../../errors/user.js';
import { Decimal } from '@prisma/client/runtime/library.js';
import type {
    ICreateTransactionRepository,
    IGetUserByIdRepository,
} from '../../repositories/interfaces.js';
import type { ICreateTransactionUseCase } from '../interfaces.js';
import type {
    CreateTransactionPayloadDTO,
    Transaction,
} from '../../types/transaction.type.js';

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
    private readonly createTransactionRepository: ICreateTransactionRepository;
    private readonly getUserByIdRepository: IGetUserByIdRepository;

    constructor(
        createTransactionRepository: ICreateTransactionRepository,
        getUserByIdRepository: IGetUserByIdRepository
    ) {
        this.createTransactionRepository = createTransactionRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(
        createTransactionParams: CreateTransactionPayloadDTO
    ): Promise<Transaction> {
        const userId = createTransactionParams.user_id;

        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError(userId);
        }

        const transactionId = uuidv4();

        const transactionToCreate: Transaction = {
            id: transactionId,
            user_id: createTransactionParams.user_id,
            name: createTransactionParams.name,
            date: createTransactionParams.date,
            amount: new Decimal(createTransactionParams.amount),
            type: createTransactionParams.type,
        };

        const transaction = await this.createTransactionRepository.execute(
            transactionToCreate
        );

        return transaction;
    }
}
