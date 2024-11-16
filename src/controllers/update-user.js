import { badRequest, ok, serverError } from '../controllers/helpers/http.js';
import validator from 'validator';
import { UpdateUserUseCase } from '../use-case/update-user.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseResponse,
    invalidPasswordResponse,
} from './helpers/user.js';

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const userId = httpRequest.params.userId;

            const isIdValid = validator.isUUID(userId);

            if (!isIdValid) {
                return invalidPasswordResponse();
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const someFieldIsNotAllowed = Object.keys(params).some((field) => {
                return !allowedFields.includes(field);
            });

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some field is not allowed',
                });
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password);

                if (passwordIsValid) {
                    return invalidPasswordResponse();
                }
            }

            if (params.email) {
                const emailIsNotValid = checkIfEmailIsValid(params.email);

                if (!emailIsNotValid) {
                    return emailIsAlreadyInUseResponse();
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();

            const updatedUser = await updateUserUseCase.execute(userId, params);

            return ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.log(error);
            return serverError();
        }
    }
}
