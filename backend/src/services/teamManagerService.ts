import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { TeamManagerDTO } from "@/types/team-manager.dto";
import { CreateUserDTO } from "@/types/user.dto";
import { generateToken, hashPassword } from "@/utils/auth";
import { DuplicateError, NotFoundError, ValidationError } from "@/utils/error";
import { v4 as uuidv4 } from 'uuid';

export class TeamManagerService{



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
                role: 'MANAGER',
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

    async fetchManagers(){
        const managers = await prisma.user.findMany({
            where:{
                role:'MANAGER'
            },
            select:{
                id: true,
                email: true,
                name: true,
                role: true
            }
        })
        return managers;
    }

    async assignWorkSpace(data: TeamManagerDTO){
        if(!data.email){
            throw new ValidationError('Email Is Required For Assigning');
        }
        if(!data.teamName){
            throw new ValidationError('WorkSpace name is required');
        }
        const teamManager = await prisma.user.findFirst({
            where:{
                email: data.email
            }
        })
        if(!teamManager){
            throw new NotFoundError('Incorrect credentails of Team-Manager');
        }
        const workspace = await prisma.workSpaces.update({
            where:{
                name: data.teamName
            },
            data:{
                assignedTo: teamManager.email
            }
        })
        return workspace;
    }
}