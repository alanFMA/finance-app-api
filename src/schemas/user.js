import { z } from 'zod';

export const createUserSchema = z.object({
    first_name: z.string().trim().nonempty({
        message: 'First name is required.',
    }),
    last_name: z.string().trim().nonempty({
        message: 'Last name is required.',
    }),
    email: z
        .string()
        .trim()
        .nonempty({
            message: 'E-mail is required.',
        })
        .email({
            message: 'Please provide a valid e-mail.',
        }),
    password: z.string().trim().min(6, {
        message: 'Password must have at least 6 characters.',
    }),
});
