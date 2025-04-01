import { UserNotFoundError } from '../../errors/user.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    requiredFieldsIsMissingResponse,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js';

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.user_id;

            if (!userId) {
                return requiredFieldsIsMissingResponse('userId');
            }

            const userIdIsvalid = checkIfIdIsValid(userId);

            if (!userIdIsvalid) {
                return invalidIdResponse();
            }

            const transactions = await this.getTransactionsByUserIdUseCase({
                userId,
            });

            return ok(transactions);
        } catch (error) {
            console.error(error);
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }

            return serverError();
        }
    }
}
