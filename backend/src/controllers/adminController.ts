import { logger } from "@/lib/logger";
import { AdminService } from "@/services/adminService";
import { AuthenticationError, DuplicateEmailError, ValidationError } from "@/utils/error";
import { RequestHandler } from "express";


export class AdminController{
    private adminService!: AdminService;

    constructor(){
        this.adminService = new AdminService();
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
            } else if(error instanceof DuplicateEmailError){
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
}