import { createTransactionSchema } from '../../schemas/transaction.js';
import { badRequest, created, serverError } from '../helpers/index.js';
import { ZodError } from 'zod';

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            await createTransactionSchema.parseAsync(params);

            const transaction =
                await this.createTransactionUseCase.execute(params);

            return created(transaction);
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.issues.reduce((acc, issue) => {
                    acc[issue.path[0]] = issue.message;
                    return acc;
                }, {});
                return badRequest(formattedErrors);
            }

            console.error(error);
            return serverError();
        }
    }
}
