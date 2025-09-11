import { badRequest, notFound, HttpResponse, ErrorBody } from './http.js';

export const invalidPasswordResponse = (): HttpResponse<ErrorBody> => {
    return badRequest({
        message: 'Password must be at least 6 characters.',
    });
};

export const emailIsAlreadyInUseResponse = (): HttpResponse<ErrorBody> => {
    return badRequest({
        message: 'E-mail is already in use.',
    });
};

export const userNotFoundResponse = (): HttpResponse<ErrorBody> => {
    return notFound({ message: 'User not found.' });
};
