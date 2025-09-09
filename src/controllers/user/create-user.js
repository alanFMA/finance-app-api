import { EmailAlreadyInUseError } from '../../errors/user.js';
import { createUserSchema } from '../../schemas/user.js';
import { badRequest, created, serverError } from '../helpers/index.js';
import { ZodError } from 'zod';

export class CreateUserUseController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            await createUserSchema.parseAsync(params);

            const createdUser = await this.createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.issues.reduce((acc, issue) => {
                    acc[issue.path[0]] = issue.message;
                    return acc;
                }, {});
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
