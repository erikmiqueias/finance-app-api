export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(email);
        this.name = 'EmailAlreadyInUseError';
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(userId);
        this.name = 'UserNotFoundError';
    }
}
