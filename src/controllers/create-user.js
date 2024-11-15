import { CreateUserUseCase } from '../use-case/create-user.js';
import validator from 'validator';
import { badRequest, created, serverError } from './helpers.js';

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requireFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            for (const field of requireFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` });
                }
            }

            const validPassword = params.password.length < 6;

            if (validPassword) {
                return badRequest({
                    message: 'Password must be at least 6 characters',
                });
            }

            const emailIsValid = validator.isEmail(params.email);

            if (!emailIsValid) {
                return badRequest({ message: 'Invalid email' });
            }

            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            console.error('Error: ', error);
            return serverError();
        }
    }
}
