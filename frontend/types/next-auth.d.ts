import 'next-auth'
import { DefaultSession } from 'next-auth';


declare module 'next-auth'{
    interface User{
        id?:string;
        userId?: string;
        role?: string;
        accessToken?: string;
    }

    interface Session{
        user:{
            role?: string;
            userId?: string;
            accessToken?: string;
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt'{
    interface JWT{
        role?: string;
        userId?: string;
        accessToken?: string;
    }
}