import {
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js';
import {
    checkIfAmountIsValid,
    checkIfTypeIsValid,
    invalidAmountResponse,
    invalidTypeReponse,
} from '../helpers/transaction.js';

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requireFields = ['user_id', 'name', 'date', 'amount', 'type'];

            const { ok: requiredFieldsWereProvided, missingField } =
                validateRequiredFields(params, requireFields);

            if (!requiredFieldsWereProvided) {
                return requiredFieldIsMissingResponse(missingField);
            }

            const userIdIsValid = checkIfIdIsValid(params.user_id);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            const amountIsValid = checkIfAmountIsValid(params.amount);

            if (!amountIsValid) {
                return invalidAmountResponse();
            }

            const type = params.type.toUpperCase();

            const typeIsValid = checkIfTypeIsValid(type);

            if (!typeIsValid) {
                return invalidTypeReponse();
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            });

            return created(transaction);
        } catch (error) {
            console.error(error);
            return serverError(error);
        }
    }
}
