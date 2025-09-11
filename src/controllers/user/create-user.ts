import { EmailAlreadyInUseError } from '../../errors/user.js';
import { createUserSchema } from '../../schemas/user.js';
import {
    badRequest,
    created,
    serverError,
    HttpResponse,
    ErrorBody,
} from '../helpers/index.js';
import { ZodError } from 'zod';
import type { ICreateUserUseCase } from '../../use-cases/interfaces.js';
import type { HttpRequest } from '../types.js';
import type { User } from '../../types/user.types.js';

type ZodFormattedError = Record<string, string>;

export class CreateUserController {
    private readonly createUserUseCase: ICreateUserUseCase;

    constructor(createUserUseCase: ICreateUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    async execute(
        httpRequest: HttpRequest<unknown>
    ): Promise<HttpResponse<User | ZodFormattedError | ErrorBody>> {
        try {
            const params = createUserSchema.parse(httpRequest.body);
            const createdUser = await this.createUserUseCase.execute(params);

            return created(createdUser);
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
