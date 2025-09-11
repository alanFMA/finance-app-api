import {
    checkIfIdIsValid,
    badRequest,
    ok,
    serverError,
    userNotFoundResponse,
    HttpResponse,
    ErrorBody,
} from '../helpers/index.js';
import type { IGetUserByIdUseCase } from '../../use-cases/interfaces.js';
import type { HttpRequest } from '../types.js';
import type { User } from '../../types/user.types.js';

export class GetUserByIdController {
    private readonly getUserByIdUseCase: IGetUserByIdUseCase;

    constructor(getUserByIdUseCase: IGetUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }

    async execute(
        httpRequest: HttpRequest<any, { userId: string }>
    ): Promise<HttpResponse<User | ErrorBody>> {
        try {
            const userId = httpRequest.params?.userId;

            if (!userId) {
                return badRequest({ message: 'User ID is required.' });
            }

            const isIdValid = checkIfIdIsValid(userId);

            if (!isIdValid) {
                return badRequest({
                    message: 'The provided id is not valid.',
                });
            }

            const user = await this.getUserByIdUseCase.execute(userId);

            if (!user) {
                return userNotFoundResponse();
            }

            return ok(user);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
