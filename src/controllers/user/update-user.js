import { ZodError } from 'zod';
import { EmailAlreadyInUseError } from '../../errors/user.js';
import { updateUserSchema } from '../../schemas/user.js';
import {
    checkIfIdIsValid,
    invalidPasswordResponse,
    badRequest,
    ok,
    serverError,
} from '../helpers/index.js';

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const userId = httpRequest.params.userId;

            const isIdValid = checkIfIdIsValid(userId);

            if (!isIdValid) {
                return invalidPasswordResponse();
            }

            await updateUserSchema.parseAsync(params);

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            );

            return ok(updatedUser);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                });
            }
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.log(error);
            return serverError();
        }
    }
}
