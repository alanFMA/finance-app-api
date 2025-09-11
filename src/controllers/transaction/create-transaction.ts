import { createTransactionSchema } from '../../schemas/index.js';
import {
    badRequest,
    created,
    serverError,
    HttpResponse,
    ErrorBody,
} from '../helpers/index.js';
import { ZodError } from 'zod';
import type { ICreateTransactionUseCase } from '../../use-cases/interfaces.js';
import type { HttpRequest } from '../types.js';
import type { Transaction } from '../../types/transaction.type.js';

type ZodFormattedError = Record<string, string>;

export class CreateTransactionController {
    private readonly createTransactionUseCase: ICreateTransactionUseCase;

    constructor(createTransactionUseCase: ICreateTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    async execute(
        httpRequest: HttpRequest<unknown>
    ): Promise<HttpResponse<Transaction | ZodFormattedError | ErrorBody>> {
        try {
            const params = createTransactionSchema.parse(httpRequest.body);

            const transaction = await this.createTransactionUseCase.execute(
                params
            );

            return created(transaction);
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.issues.reduce<ZodFormattedError>(
                    (acc, issue) => {
                        const field = issue.path[0] as string;
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
