import {} from '../../errors/user.js';

export class UpdateTransactionUseCase {
    constructor(UpdateTransactionRepository) {
        this.UpdateTransactionRepository = UpdateTransactionRepository;
    }

    async execute(transactionId, params) {
        const transaction = await this.UpdateTransactionRepository.execute(
            transactionId,
            params,
        );

        return transaction;
    }
}
