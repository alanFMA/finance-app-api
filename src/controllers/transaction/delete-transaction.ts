import {
    serverError,
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    transactionNotFoundResponse,
    badRequest,
    HttpResponse,
    ErrorBody,
} from '../helpers/index.js';
import type { IDeleteTransactionUseCase } from '../../use-cases/interfaces.js';
import type { HttpRequest } from '../types.js';
import type { Transaction } from '../../types/transaction.type.js';

export class DeleteTransactionController {
    private readonly deleteTransactionUseCase: IDeleteTransactionUseCase;

    constructor(deleteTransactionUseCase: IDeleteTransactionUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase;
    }

    async execute(
        httpRequest: HttpRequest<any, { transactionId: string }>
    ): Promise<HttpResponse<Transaction | ErrorBody>> {
        try {
            const transactionId = httpRequest.params?.transactionId;

            if (!transactionId) {
                return badRequest({ message: 'Transaction ID is required.' });
            }

            const idIsValid = checkIfIdIsValid(transactionId);

            if (!idIsValid) {
                return invalidIdResponse();
            }

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(transactionId);

            if (!deletedTransaction) {
                return transactionNotFoundResponse();
            }

            return ok(deletedTransaction);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
