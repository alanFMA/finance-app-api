export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`This email '${email}' is already in use.`);
        this.name = 'EmailAlreadyInUseError';
    }
}
