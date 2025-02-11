import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { CreateUserDTO, ResetPassword } from "@/types/user.dto";
import { comparePassword, generateToken, hashPassword } from "@/utils/auth";
import { DuplicateError, ValidationError } from "@/utils/error";
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from "./emailService";
import { Cache } from "@/utils/cache";
import { pool } from "@/workers/taskProcessor";
import { JwtPayload } from "jsonwebtoken";



export class UserService {
    private emailService!: EmailService;
    private cache!: Cache;

    constructor(){
        this.emailService = new EmailService();
        this.cache = new Cache();
    }

    async createUser(data: CreateUserDTO) {
        const userId = uuidv4();

        //------Validations-----
        if(!data.email){
            throw new ValidationError("Email Field is required!");
        }
        if(!data.password){
            throw new ValidationError("Password Field is required!");
        }
        if(!data.name){
            throw new ValidationError("Name Field is required!");
        }

        const checkDuplicate = await prisma.user.findFirst({
            where:{
                email: data.email
            }
        })
        if(checkDuplicate != null){
            throw new DuplicateError("Email Already Exsist")
            
        }
        const hashedPassword = await hashPassword(data.password);
        const result = await prisma.user.create({
            data: {
                userId: userId,
                email: data.email,
                password: hashedPassword,
                name: data.name ??  "" 
            }
        });
        const userToken = await generateToken(result.userId);
        const user = {
            ...result,
            token: userToken
        }
        logger.info('Operation Successful',{
            userId: user.userId,
            action: 'new_user'
        })
        return user;
    }

    async loginUser ( data: CreateUserDTO){
        if(!data.email){
            throw new ValidationError('Email is required!');
        }
        if(!data.password){
            throw new ValidationError('Password is required!');
        }
        const userFound = await prisma.user.findFirst({
            where:{
                email:data.email
            }
        })
        if(!userFound){
            throw new ValidationError('User Not Found!');
        }
        console.log('user found', userFound);
        const confirmUser = await comparePassword(data.password, userFound.password);
        if(!confirmUser){
            throw new ValidationError('Invalide Email/Password!');
        }
        const token = await  generateToken(userFound.userId);
        const user = {
            ...userFound,
            token: token
        }
        logger.info('Operation Successful',{
            userId: user.userId,
            action:'user_login'
        })
        const {password, ...cacheData} = user
        this.cache.cacheUserSession(user.userId,cacheData);
        return user;
    }

    async resetRequest(data:ResetPassword){
        if(!data.email){
            throw new ValidationError('Email field is required!');
        }
        const user = await prisma.user.findFirst({
            where:{
                email:data.email
            }
        })
        if(!user){
            throw new ValidationError('User Not Found!');
        }
        const token = await generateToken(user.userId);
        await pool.run({
            type: 'email',
            payload: { email: data.email,token }
        })
        //store token in DB with expire Time
        await prisma.passwordReset.create({
            data:{
                userId: user.userId,
                token: token,
                expiresAt: new Date(Date.now()+ 3600000)
            }
        })
        // await this.emailService.sendPasswordReset(data.email,token);
    }

    async resetRespond(data:ResetPassword, user: JwtPayload|undefined){
        if(!data.password){
            throw new ValidationError('Password Field is required!');
        }
        const password = await hashPassword(data.password);
        await prisma.user.update({
            where:{
                userId: user?.userId
            },
            data:{
                password: password
            }
        })
    }
}