import { UserNotFoundError } from '../../errors/user.js';
import { ok } from '../helpers/http.js';
import { checkIfIdIsValid } from '../helpers/user.js';
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
            if (error instanceof UserNotFoundError) {
                throw new UserNotFoundError(params.userId);
            }
        }
    }
}
