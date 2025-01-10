import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 8);
}

export const comparePassword = async(password:string, hashed: string):Promise<boolean> =>{
    return bcrypt.compare(password,hashed);
}

export const generateToken = async (userId: string): Promise<string> => {
    return jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn:'24h'})
}