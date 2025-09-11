export interface ErrorBody {
    message: string;
}

export interface HttpResponse<T> {
    statusCode: number;
    body: T;
}

export const ok = <T>(body: T): HttpResponse<T> => ({
    statusCode: 200,
    body,
});

export const created = <T>(body: T): HttpResponse<T> => ({
    statusCode: 201,
    body,
});

export const badRequest = <T>(body: T): HttpResponse<T> => ({
    statusCode: 400,
    body,
});

export const notFound = (body: ErrorBody): HttpResponse<ErrorBody> => ({
    statusCode: 404,
    body,
});

export const serverError = (): HttpResponse<ErrorBody> => ({
    statusCode: 500,
    body: { message: 'Internal server error.' },
});
