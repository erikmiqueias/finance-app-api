import { CreateUserUseCase } from '../use-case/create-user.js';
import {
    badRequest,
    created,
    serverError,
} from '../controllers/helpers/http.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseResponse,
    invalidPasswordResponse,
} from './helpers/user.js';

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

            const passwordIsNotValid = checkIfPasswordIsValid(params.password);

            if (passwordIsNotValid) {
                return invalidPasswordResponse();
            }

            const emailIsValid = checkIfEmailIsValid(params.email);

            if (!emailIsValid) {
                return emailIsAlreadyInUseResponse();
            }

            const createUserUseCase = new CreateUserUseCase();

            const createdUser = await createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.error('Error: ', error);
            return serverError();
        }
    }
}
