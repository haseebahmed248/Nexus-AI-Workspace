import { logger } from "@/lib/logger";
import { AdminService } from "@/services/adminService";
import { WorkSpaceService } from "@/services/workSpaceService";
import { AuthenticationError, DuplicateError, ValidationError } from "@/utils/error";
import { RequestHandler } from "express";


export class AdminController{
    private adminService!: AdminService;
    private workSpaceService!: WorkSpaceService;

    constructor(){
        this.adminService = new AdminService();
        this.workSpaceService = new WorkSpaceService();
    }

    registerAdmin:RequestHandler = async(req, res)=>{
        try {
            const admin = this.adminService.createAdmin(req.body);
            logger.info('admin_created',{
                "message":"new Admin user created",
                "email":(await admin).email
            })
            res.status(201).json({
                success:true,
                data: admin
            })
        } catch (error) {
            if(error instanceof ValidationError){
                res.status(401).json({
                    success: false,
                    message:'All Fields are required'
                });
            } else if(error instanceof DuplicateError){
                console.log('duplicate errro');
                res.status(409).json({
                    success:false,
                    message: 'Email already exsists'
                })
            }else{
                res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                });
            }
        }
    }

    getAdminUsers:RequestHandler = async(req, res)=>{
        try {
            const users =await this.adminService.fetchUsers();
            if(users.length === 0){
                throw new AuthenticationError('No users found');
            }
            res.status(201).json({
                success: true,
                data: users
            })
        } catch (error) {
            if(error instanceof AuthenticationError){
                res.status(404).json({
                    success: false,
                    message: 'No users found'
                })
            }else{
                res.status(500).json({
                    success:false,
                    message: 'Internal Server Error'
                })
            }
        }
    }
}