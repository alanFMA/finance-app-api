import type { IUpdateTransactionUseCase } from '../../use-cases/interfaces.js';
import type { IUpdateTransactionRepository } from '../../repositories/interfaces.js';
import type {
    UpdateTransactionPayloadDTO,
    Transaction,
} from '../../types/transaction.type.js';

export class UpdateTransactionUseCase implements IUpdateTransactionUseCase {
    private readonly updateTransactionRepository: IUpdateTransactionRepository;

    constructor(updateTransactionRepository: IUpdateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository;
    }

    async execute(
        transactionId: string,
        params: UpdateTransactionPayloadDTO
    ): Promise<Transaction | null> {
        const updatedTransaction =
            await this.updateTransactionRepository.execute(
                transactionId,
                params
            );

        return updatedTransaction;
    }
}
