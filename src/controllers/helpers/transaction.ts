import validator from 'validator';
import { badRequest, HttpResponse, ErrorBody, notFound } from './http.js';

export type TransactionType = 'EARNING' | 'EXPENSE' | 'INVESTMENT';

const validTypes: TransactionType[] = ['EARNING', 'EXPENSE', 'INVESTMENT'];

export const checkIfAmountIsValid = (amount: unknown): boolean => {
    if (typeof amount !== 'number') {
        return false;
    }
    return validator.isCurrency(amount.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    });
};

export const checkIfTypeIsValid = (type: any): type is TransactionType => {
    return validTypes.includes(type);
};

export const invalidAmountResponse = (): HttpResponse<ErrorBody> => {
    return badRequest({
        message: 'The amount must be valid currency.',
    });
};

export const invalidTypeResponse = (): HttpResponse<ErrorBody> => {
    return badRequest({
        message: 'The type must be EARNING, EXPENSE, or INVESTMENT.',
    });
};

export const transactionNotFoundResponse = (): HttpResponse<ErrorBody> => {
    return notFound({ message: 'Transaction not found.' });
};
