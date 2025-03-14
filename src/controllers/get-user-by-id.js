import { GetUserByIdUseCase } from '../use-cases/index.js';
import {
    checkIfIdIsValid,
    badRequest,
    ok,
    serverError,
    userNotFoundResponse,
} from './helpers/index.js';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isIdValid = checkIfIdIsValid(userId);

            if (!isIdValid) {
                return badRequest({
                    message: 'The provided id is not valid',
                });
            }

            const getUserByIdUseCase = new GetUserByIdUseCase();

            const user = await getUserByIdUseCase.execute(userId);

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
