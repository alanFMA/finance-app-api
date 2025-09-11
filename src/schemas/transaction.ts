import { z } from 'zod';
import validator from 'validator';

export const createTransactionSchema = z.object({
    user_id: z.string().uuid({ message: 'User ID must be a valid UUID.' }),
    name: z.string().trim().min(1, { message: 'Name is required.' }),
    date: z.coerce.date(),
    type: z.enum(['EXPENSE', 'EARNING', 'INVESTMENT'], {
        message: 'Type must be EXPENSE, EARNING, or INVESTMENT.',
    }),
    amount: z
        .number()
        .min(0.01, { message: 'Amount must be greater than 0.' })
        .refine(
            (value) =>
                validator.isCurrency(value.toFixed(2), {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                }),
            {
                message:
                    'Amount must be a valid currency format (e.g., 123.45).',
            }
        ),
});

export const updateTransactionSchema = z
    .object({
        name: z.string().trim().min(1).optional(),
        date: z.coerce.date().optional(),
        type: z.enum(['EXPENSE', 'EARNING', 'INVESTMENT']).optional(),
        amount: z
            .number()
            .min(0.01, { message: 'Amount must be greater than 0.' })
            .refine(
                (value) =>
                    validator.isCurrency(value.toFixed(2), {
                        digits_after_decimal: [2],
                        allow_negatives: false,
                        decimal_separator: '.',
                    }),
                {
                    message:
                        'Amount must be a valid currency format (e.g., 123.45).',
                }
            )
            .optional(),
    })
    .strict();

export type UpdateTransactionSchemaType = z.infer<
    typeof updateTransactionSchema
>;

export type CreateTransactionSchemaType = z.infer<
    typeof createTransactionSchema
>;
