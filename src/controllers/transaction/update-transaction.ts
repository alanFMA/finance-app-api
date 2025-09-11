import {
    checkIfIdIsValid,
    invalidIdResponse,
    badRequest,
    ok,
    serverError,
    transactionNotFoundResponse,
    HttpResponse,
    ErrorBody,
} from '../helpers/index.js';
import { ZodError } from 'zod';
import { updateTransactionSchema } from '../../schemas/index.js';
import type { IUpdateTransactionUseCase } from '../../use-cases/interfaces.js';
import type { HttpRequest } from '../types.js';
import type { Transaction } from '../../types/transaction.type.js';

type ZodFormattedError = Record<string, string>;

export class UpdateTransactionController {
    private readonly updateTransactionUseCase: IUpdateTransactionUseCase;

    constructor(updateTransactionUseCase: IUpdateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }

    async execute(
        httpRequest: HttpRequest<unknown, { transactionId: string }>
    ): Promise<HttpResponse<Transaction | ZodFormattedError | ErrorBody>> {
        try {
            const transactionId = httpRequest.params?.transactionId;

            if (!transactionId || !checkIfIdIsValid(transactionId)) {
                return invalidIdResponse();
            }

            const paramsToUpdate = updateTransactionSchema.parse(
                httpRequest.body
            );

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    transactionId,
                    paramsToUpdate
                );

            if (!updatedTransaction) {
                return transactionNotFoundResponse();
            }

            return ok(updatedTransaction);
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.issues.reduce<ZodFormattedError>(
                    (acc, issue) => {
                        const field = issue.path[
                            issue.path.length - 1
                        ] as string;
                        acc[field] = issue.message;
                        return acc;
                    },
                    {}
                );
                return badRequest(formattedErrors);
            }

            console.error(error);
            return serverError();
        }
    }
}
