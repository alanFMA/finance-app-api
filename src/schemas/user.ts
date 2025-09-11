import { z } from 'zod';

export const createUserSchema = z.object({
    first_name: z.string().trim().min(1, {
        message: 'First name is required.',
    }),
    last_name: z.string().trim().min(1, {
        message: 'Last name is required.',
    }),
    email: z
        .string()
        .trim()
        .min(1, {
            message: 'E-mail is required.',
        })
        .email({
            message: 'Please provide a valid e-mail.',
        }),
    password: z.string().min(6, {
        message: 'Password must have at least 6 characters.',
    }),
});

export const updateUserSchema = createUserSchema.partial().strict();

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;
