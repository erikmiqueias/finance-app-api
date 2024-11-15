import { v4 as uuidv4 } from 'uuid';
import bcypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: Verificar se o email já existe

        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();

        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            );

        if (userWithProvidedEmail) {
            throw new Error(
                `User with email ${createUserParams.email} already exists`,
            );
        }

        // gerar ID do usuário
        const userId = uuidv4();

        // criptografar a senha
        const hashedPassword = await bcypt.hash(createUserParams.password, 10);

        // inserir usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        // chamar o repository

        const postgresCreateUserRepository = new PostgresCreateUserRepository();
        return await postgresCreateUserRepository.execute(user);
    }
}
