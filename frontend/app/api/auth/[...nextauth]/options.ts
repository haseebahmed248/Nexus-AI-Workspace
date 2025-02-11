import axiosInstance from "@/lib/utils/axios";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "",
            credentials: {
                email: { label: 'email' },
                password: {label: 'password'}
            },
            async authorize(credentials, req) {
                const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`,{
                    email: credentials?.email,
                    password: credentials?.password
                });
                const user = response.data.data;
                if (user) {
                    return {
                        name: user.name,
                        email: user.email,
                        userId: user.userId,
                        role: user.role,
                        accessToken: user.token
                    }
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async jwt({ token, user }) {
            if(user){
                token.name = user.name;
                token.userId = user.userId;
                token.role = user.role;
                token.email = user.email;
                token.accessToken = user.accessToken;
            }
            return token
        },
        async session({ session, token }) {
            if(session.user){
                session.user.role = token.role;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.userId = token.userId;
                session.user.accessToken = token.accessToken;
            }
            return session
        }
    },
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET
}