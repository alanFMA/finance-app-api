import validator from 'validator';
import { UpdateUserUseCase } from '../use-cases/index.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import {
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseResponse,
    invalidIdResponse,
    invalidPasswordResponse,
    badRequest,
    ok,
    serverError,
} from './helpers/index.js';

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isIdValid = checkIfIdIsValid(userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const params = httpRequest.body;

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const someFieldIsNowAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            );

            if (someFieldIsNowAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                });
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password);

                if (!passwordIsValid) {
                    return invalidPasswordResponse();
                }
            }

            if (params.email) {
                const emailIsValid = validator.isEmail(params.email);

                if (!emailIsValid) {
                    return emailIsAlreadyInUseResponse();
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();

            const updatedUser = await updateUserUseCase.execute(userId, params);

            return ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({
                    message: error.message,
                });
            }

            console.error(error);
            return serverError();
        }
    }
}
