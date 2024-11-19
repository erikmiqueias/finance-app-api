import { EmailAlreadyInUseError } from '../../errors/user.js';
import { badRequest, created, serverError } from '../helpers/index.js';
import { createdUserSchema } from '../../schemas/index.js';

import { ZodError } from 'zod';

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            await createdUserSchema.parseAsync(params);
            const createdUser = await this.createUserUseCase.execute(params);

            return created(createdUser);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                });
            }
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.error('Error: ', error);
            return serverError();
        }
    }
}
