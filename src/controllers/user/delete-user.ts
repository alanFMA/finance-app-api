import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
    badRequest,
    HttpResponse,
    ErrorBody,
} from '../helpers/index.js';
import type { IDeleteUserUseCase } from '../../use-cases/interfaces.js';
import type { HttpRequest } from '../types.js';
import type { User } from '../../types/user.types.js';

export class DeleteUserController {
    private readonly deleteUserUseCase: IDeleteUserUseCase;

    constructor(deleteUserUseCase: IDeleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }

    async execute(
        httpRequest: HttpRequest<any, { userId: string }>
    ): Promise<HttpResponse<User | ErrorBody>> {
        try {
            const userId = httpRequest.params?.userId;

            if (!userId) {
                return badRequest({ message: 'User ID is required.' });
            }

            const idIsValid = checkIfIdIsValid(userId);

            if (!idIsValid) {
                return invalidIdResponse();
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId);

            if (!deletedUser) {
                return userNotFoundResponse();
            }

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
