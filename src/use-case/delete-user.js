import { PostgresDeleteUserRepository } from '../repositories/postgres';

export class DeleteUserUseCase {
    async execute(userId) {
        const postgresDeletedUserRepository =
            new PostgresDeleteUserRepository();

        const deletedUser = await postgresDeletedUserRepository.execute(userId);

        return deletedUser;
    }
}
