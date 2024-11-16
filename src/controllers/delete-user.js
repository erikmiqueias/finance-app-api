import { DeleteUserUseCase } from '../use-case/index.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from './helpers/index.js';

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const idIsValid = checkIfIdIsValid(userId);

            if (!idIsValid) {
                return invalidIdResponse();
            }

            if (userId === undefined) {
                return invalidIdResponse();
            }

            const deleteUserUseCase = new DeleteUserUseCase();

            const deletedUser = await deleteUserUseCase.execute(userId);
            if (deletedUser === undefined) {
                return userNotFoundResponse();
            }

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
