import validator from 'validator';

import { badRequest, HttpResponse, ErrorBody } from './http.js';

export const checkIfIdIsValid = (id: unknown): boolean => {
    if (typeof id !== 'string') {
        return false;
    }
    return validator.isUUID(id);
};

export const invalidIdResponse = (): HttpResponse<ErrorBody> => {
    return badRequest({
        message: 'The provided id is not valid.',
    });
};

export const requiredFieldsIsMissingResponse = (
    field: string
): HttpResponse<ErrorBody> => {
    return badRequest({
        message: `The field '${field}' is required.`,
    });
};

export const checkIfIsString = (value: unknown): value is string => {
    return typeof value === 'string';
};

type ValidationResult =
    | { ok: true; missingField: undefined }
    | { ok: false; missingField: string };

export const validateRequiredFields = (
    params: Record<string, unknown>,
    requiredFields: string[]
): ValidationResult => {
    for (const field of requiredFields) {
        const fieldValue = params[field];
        const fieldIsMissing = !fieldValue;

        const fieldIsEmpty =
            checkIfIsString(fieldValue) &&
            validator.isEmpty(fieldValue, {
                ignore_whitespace: true,
            });

        if (fieldIsMissing || fieldIsEmpty) {
            return {
                ok: false,
                missingField: field,
            };
        }
    }

    return {
        ok: true,
        missingField: undefined,
    };
};
