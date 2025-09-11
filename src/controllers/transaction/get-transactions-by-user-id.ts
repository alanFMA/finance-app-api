import { UserNotFoundError } from '../../errors/user.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    requiredFieldsIsMissingResponse,
    serverError,
    userNotFoundResponse,
    HttpResponse,
    ErrorBody,
} from '../helpers/index.js';
import type { IGetTransactionsByUserIdUseCase } from '../../use-cases/interfaces.js';
import type { HttpRequest } from '../types.js';
import type { Transaction } from '../../types/transaction.type.js';

export class GetTransactionsByUserIdController {
    private readonly getTransactionsByUserIdUseCase: IGetTransactionsByUserIdUseCase;

    constructor(
        getTransactionsByUserIdUseCase: IGetTransactionsByUserIdUseCase
    ) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
    }
    async execute(
        httpRequest: HttpRequest<any, any, { userId: string }>
    ): Promise<HttpResponse<Transaction[] | ErrorBody>> {
        try {
            const userId = httpRequest.query?.userId;

            if (!userId) {
                return requiredFieldsIsMissingResponse('userId');
            }

            const userIdIsValid = checkIfIdIsValid(userId);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                });

            return ok(transactions);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }

            console.error(error);
            return serverError();
        }
    }
}
