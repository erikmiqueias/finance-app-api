import validator from 'validator';
import { badRequest } from './http.js';

export const invalidIdResponse = () => {
    return badRequest({
        message: 'The provided id is not valid',
    });
};

export const checkIfIsString = (value) => {
    return typeof value === 'string';
};

export const requiredFieldIsMissingResponse = (field) => {
    return badRequest({
        message: `Missing param: ${field}`,
    });
};

export const validateRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const fieldIsMissing = !params[field];
        const fieldIsEmpty =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], {
                ignore_whitespace: true,
            });

        if (fieldIsMissing || fieldIsEmpty) {
            return {
                missingField: field,
                ok: false,
            };
        }
    }

    return {
        ok: true,
        missingField: undefined,
    };
};
