import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfAmountIsValid = (amount) => {
    return validator.isCurrency(amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    });
};

export const checkIfTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTIMENT'].includes(type);
};

export const invalidAmountResponse = () => {
    return badRequest({
        message: 'The amount must be valid curency.',
    });
};

export const invalidTypeResponse = () => {
    return badRequest({
        message: 'The type must be EARNING, EXPENSE, INVESTMENT.',
    });
};
