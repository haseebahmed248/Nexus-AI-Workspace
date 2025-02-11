import { prisma } from "@/lib/prisma";
import { CreateAdmin } from "@/types/admin.dto";
import { hashPassword } from "@/utils/auth";
import {  DuplicateError, ValidationError } from "@/utils/error";
import {v4 as  uuidv4} from 'uuid'
import { CreateWorkSpaceDTO } from "@/types/workspace.dto";

export class AdminService{

    async createAdmin(data:CreateAdmin){
        const userId = uuidv4();


        if(!data.username){
            throw new ValidationError('Username is reuquired')
        }
        if(!data.email){
            throw new ValidationError('Email is required');
        }
        if(!data.password){
            throw new ValidationError('Password is required');
        }

        const alreadyExsist = await prisma.user.findFirst({
            where:{
                email: data.email
            }
        })
        console.log('already exsist', alreadyExsist);
        if(alreadyExsist){
            throw new DuplicateError('User already exsist with this email');
        }

        const hashedPassword = await hashPassword(data.password);
        const user = await prisma.user.create({
            data:{
                name: data.username,
                userId:userId,
                email: data.email,
                password: hashedPassword,
                role: "ADMIN"
            }
        })
        return user;
    }

    async fetchUsers(){
        const users = await prisma.user.findMany({
            where:{
                NOT:{
                    role: "ADMIN"
                }

            },
            select:{
                email: true,
                role: true,
                name: true,
                id: true,
                createdAt: true
            }
        })
        return users;
    }
}