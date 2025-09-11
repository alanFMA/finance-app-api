import { UserNotFoundError } from '../../errors/user.js';
import {
    serverError,
    userNotFoundResponse,
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    badRequest,
    HttpResponse,
    ErrorBody,
} from '../helpers/index.js';
import type { IGetUserBalanceUseCase } from '../../use-cases/interfaces.js';
import type { HttpRequest } from '../types.js';
import type { UserBalanceDTO } from '../../types/user.types.js';

export class GetUserBalanceController {
    private readonly getUserBalanceUseCase: IGetUserBalanceUseCase;

    constructor(getUserBalanceUseCase: IGetUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase;
    }

    async execute(
        httpRequest: HttpRequest<any, { userId: string }>
    ): Promise<HttpResponse<UserBalanceDTO | ErrorBody>> {
        try {
            const userId = httpRequest.params?.userId;

            if (!userId) {
                return badRequest({ message: 'User ID is required.' });
            }

            const idIsValid = checkIfIdIsValid(userId);

            if (!idIsValid) {
                return invalidIdResponse();
            }

            const balance = await this.getUserBalanceUseCase.execute(userId);

            return ok(balance);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }

            console.error(error);

            return serverError();
        }
    }
}
