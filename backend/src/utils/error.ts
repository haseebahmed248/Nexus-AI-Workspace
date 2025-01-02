

export class DuplicateEmailError extends Error{
    constructor(message: string){
        super(message);
        this.name = 'DuplicateEmailError';
    }
}

export class ValidationError extends Error{
    constructor(message: string){
        super(message);
        this.name = 'ValidationError';
    }
}

export class AuthenticationError extends Error{
    constructor(message: string){
        super(message);
        this.name = message;
    }
}