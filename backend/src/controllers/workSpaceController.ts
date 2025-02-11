import { logger } from "@/lib/logger";
import { WorkSpaceService } from "@/services/workSpaceService";
import { ValidationError } from "@/utils/error";
import { RequestHandler } from "express";

export class WorkSpaceController{
    private workSpaceService: WorkSpaceService;

    constructor(){
        this.workSpaceService = new WorkSpaceService();
    }

    createWorkSpace: RequestHandler = async(req , res)=>{
        try {
            const workspace = await this.workSpaceService.makeWorkSpace(req.body);
            logger.info('workspace_created',{
                "message":"new workspace created",
                "workspace":(await workspace).name
            })
            res.status(201).json({
                success: true,
                data: workspace
            })
        } catch (error) {
            if(error instanceof ValidationError){
                res.status(401).json({
                    success: false,
                    message: 'All fields are required'
                })
            }else{
                res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                })
            }
        }
    }

    getWorkSpaces: RequestHandler = async(req, res)=>{
        try {
            const workspaces = await this.workSpaceService.findWorkSpaces();
            res.status(201).json({
                status: true,
                data: workspaces
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }


    getSpecificWorkSpaces: RequestHandler = async(req, res)=>{
        try {
            console.log('user', req.user)
            if(!req.params.email){
                throw new ValidationError('Email Field is Required');
            }
            const data = await this.workSpaceService.findAssignedWorkSpaces(req.params.email);
            res.status(201).json({
                success:true,
                data:data
            })
        } catch (error) {

            if(error instanceof ValidationError){
                res.status(401).json({
                    success:false,
                    message:'Email is Required'
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