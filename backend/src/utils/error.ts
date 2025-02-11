

export class DuplicateError extends Error{
    constructor(message: string){
        super(message);
        this.name = 'DuplicateError';
    }
}

export class ValidationError extends Error{
    constructor(message: string){
        super(message);
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends Error{
    constructor(message: string){
        super(message)
        this.name = 'NotFoundError';
    }
}

export class AuthenticationError extends Error{
    constructor(message: string){
        super(message);
        this.name = message;
    }
}

export class ServerError extends Error{
    constructor(message: string){
        super(message);
        this.name = message;
    }
}