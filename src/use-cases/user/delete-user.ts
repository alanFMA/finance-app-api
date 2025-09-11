// Arquivo: src/use-cases/user/delete-user.ts

import type { IDeleteUserRepository } from '../../repositories/interfaces.js';
import type { User } from '../../types/user.types.js';
// Importamos a interface que a classe deve seguir
import type { IDeleteUserUseCase } from '../interfaces.js';

// A classe agora 'implementa' o contrato
export class DeleteUserUseCase implements IDeleteUserUseCase {
    private readonly deleteUserRepository: IDeleteUserRepository;

    constructor(deleteUserRepository: IDeleteUserRepository) {
        this.deleteUserRepository = deleteUserRepository;
    }

    // MUDANÇA: A assinatura de retorno agora corresponde ao novo contrato
    async execute(userId: string): Promise<User | null> {
        // O repositório retorna 'User | null', então 'deletedUser' é 'User | null'
        const deletedUser = await this.deleteUserRepository.execute(userId);

        // O retorno agora é válido, pois a função admite retornar 'null'
        return deletedUser;
    }
}
