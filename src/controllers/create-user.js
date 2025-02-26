import { CreateUserUseCase } from '../use-cases/create-user.js';

export class CreateUserUseController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            // validar a requisição (campos obrigatórios, tamanho de senha e email)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return {
                        statusCode: 400,
                        body: {
                            message: `Missing param: ${field}`,
                        },
                    };
                }
            }
            // chamar o use case
            // retornar a resposta para o usuário (status code)
            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

            return {
                statusCode: 201,
                body: createdUser,
            };
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: {
                    errorMessage: 'internal server error',
                },
            };
        }
    }
}
