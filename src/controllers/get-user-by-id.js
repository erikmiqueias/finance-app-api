import { GetUserByIdUseCase } from '../use-case/get-user-by-id.js';

import {
    checkIfIdIsValid,
    badRequest,
    notFound,
    ok,
    serverError,
} from './helpers/index.js';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId);

            if (!isIdValid) {
                return badRequest({
                    message: 'Invalid user id',
                });
            }

            const getUserByIdUseCase = new GetUserByIdUseCase();

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            if (!user) {
                return notFound({
                    message: 'User not found',
                });
            }

            return ok(user);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
