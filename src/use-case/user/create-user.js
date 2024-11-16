import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../../errors/user.js';

export class CreateUserUseCase {
    constructor(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    ) {
        this.postgresCreateUserRepository = postgresCreateUserRepository;
        this.postgresGetUserByEmailRepository =
            postgresGetUserByEmailRepository;
    }
    async execute(createUserParams) {
        const userWithProvidedEmail =
            await this.postgresGetUserByEmailRepository.execute(
                createUserParams.email,
            );

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(
                `Email ${createUserParams.email} already in use.`,
            );
        }

        // gerar ID do usuário
        const userId = uuidv4();

        // criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        // inserir usuário no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        // chamar o repository

        const userCreated =
            await this.postgresCreateUserRepository.execute(user);

        return userCreated;
    }
}
