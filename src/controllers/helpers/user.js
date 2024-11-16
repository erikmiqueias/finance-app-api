import validator from 'validator';
import { badRequest, notFound } from './http.js';

export const invalidPasswordResponse = () => {
    return badRequest({
        message: 'Password must be at least 6 characters',
    });
};

export const emailIsAlreadyInUseResponse = () => {
    return badRequest({
        message: 'Invalid email',
    });
};

export const invalidIdResponse = () => {
    return badRequest({
        message: 'The provided id is not valid',
    });
};

export const checkIfPasswordIsValid = (password) => {
    return password.length >= 6;
};

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfIdIsValid = (id) => {
    return validator.isUUID(id);
};

export const userNotFoundResponse = () => {
    return notFound({
        message: 'User not found',
    });
};
