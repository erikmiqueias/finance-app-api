import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const invalidIdResponse = () => {
    return badRequest({
        message: 'The provided id is not valid',
    });
};
