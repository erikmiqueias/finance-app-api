import validator from 'validator';

export const checkIfAmountIsValid = (amount) => {
    validator.isCurrency(amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    });
};

export const checkIfTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type);
};

export const invalidAmountResponse = () => {
    return badRequest({
        message: 'The amount must be a valid currency',
    });
};

export const invalidTypeReponse = () => {
    return badRequest({
        message: 'The type must be EARNING, EXPENSE or INVESTMENT',
    });
};