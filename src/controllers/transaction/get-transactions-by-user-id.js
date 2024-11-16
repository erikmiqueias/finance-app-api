import { UserNotFoundError } from '../../errors/user.js';
import { ok, serverError } from '../helpers/http.js';
import { checkIfIdIsValid, userNotFoundResponse } from '../helpers/user.js';
import {
    invalidIdResponse,
    requiredFieldIsMissingResponse,
} from '../helpers/validation.js';

export class GetTransactionByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId;

            if (!userId) {
                return requiredFieldIsMissingResponse('userId');
            }

            const userIdIsValid = checkIfIdIsValid(userId);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                });

            return ok(transactions);
        } catch (error) {
            console.error(error);
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }
            return serverError();
        }
    }
}
