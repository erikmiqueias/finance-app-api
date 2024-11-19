import { z } from 'zod';

export const createdUserSchema = z.object({
    first_name: z
        .string({
            required_error: 'First name is required',
        })
        .trim()
        .min(1, {
            message: 'First name is required',
        }),
    last_name: z
        .string({
            required_error: 'Last name is required',
        })
        .trim()
        .min(1, {
            message: 'Last name is required',
        }),
    email: z
        .string({
            required_error: 'Email is required',
        })
        .trim()
        .email({
            message: 'Please provide a valid email address',
        })
        .min(1, {
            message: 'Email is required',
        }),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .trim()
        .min(6),
});

export const updateUserSchema = createdUserSchema.partial().strict({
    message: 'Some provided field is not allowed',
});
