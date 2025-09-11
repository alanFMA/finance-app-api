import { EmailAlreadyInUseError } from '../../errors/user.js';
import { updateUserSchema } from '../../schemas/user.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    badRequest,
    ok,
    serverError,
    HttpResponse,
    ErrorBody,
} from '../helpers/index.js';
import { ZodError } from 'zod';
import type { IUpdateUserUseCase } from '../../use-cases/interfaces.js';
import type { HttpRequest } from '../types.js';
import type { User } from '../../types/user.types.js';

type ZodFormattedError = Record<string, string>;

export class UpdateUserController {
    private readonly updateUserUseCase: IUpdateUserUseCase;

    constructor(updateUserUseCase: IUpdateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }

    async execute(
        httpRequest: HttpRequest<unknown, { userId: string }>
    ): Promise<HttpResponse<User | ZodFormattedError | ErrorBody>> {
        try {
            const userId = httpRequest.params?.userId;
            if (!userId || !checkIfIdIsValid(userId)) {
                return invalidIdResponse();
            }
            const params = updateUserSchema.parse(httpRequest.body);

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params
            );

            return ok(updatedUser);
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
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.error(error);
            return serverError();
        }
    }
}
