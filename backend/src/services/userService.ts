import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { CreateUserDTO, ResetPassword } from "@/types/user.dto";
import { comparePassword, generateToken, hashPassword } from "@/utils/auth";
import { DuplicateEmailError, ValidationError } from "@/utils/error";
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from "./emailService";


export class UserService {
    private emailService!: EmailService;

    constructor(){
        this.emailService = new EmailService();
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
            throw new DuplicateEmailError("Email Already Exsist")
            
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
        
        //store token in DB with expire Time
        await prisma.passwordReset.create({
            data:{
                userId: user.userId,
                token: token,
                expiresAt: new Date(Date.now()+ 3600000)
            }
        })
        await this.emailService.sendPasswordReset(data.email,token);
    }
}