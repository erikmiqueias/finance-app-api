export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(email);
        this.name = 'EmailAlreadyInUseError';
    }
}
