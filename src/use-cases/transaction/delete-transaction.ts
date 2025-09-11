import type { IDeleteTransactionRepository } from '../../repositories/interfaces.js';
import type { Transaction } from '../../types/transaction.type.js';

export class DeleteTransactionUseCase {
    private readonly deleteTransactionRepository: IDeleteTransactionRepository;

    constructor(deleteTransactionRepository: IDeleteTransactionRepository) {
        this.deleteTransactionRepository = deleteTransactionRepository;
    }

    async execute(transactionId: string): Promise<Transaction> {
        const transaction = await this.deleteTransactionRepository.execute(
            transactionId
        );

        return transaction;
    }
}
