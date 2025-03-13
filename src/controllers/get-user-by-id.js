import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import {
    badRequest,
    notFound,
    ok,
    serverError,
} from '../controllers/helpers/http.js';
import { checkIfIdIsValid } from './helpers/user.js';

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
                return notFound({ message: 'user not found.' });
            }

            return ok(user);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
