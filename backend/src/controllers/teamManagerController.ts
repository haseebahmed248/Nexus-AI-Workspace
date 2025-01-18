import { logger } from "@/lib/logger";
import { TeamManagerService } from "@/services/teamManagerService";
import { DuplicateError, NotFoundError, ValidationError } from "@/utils/error";
import { RequestHandler } from "express";


export class TeamManagerController{
    private teamManagerSerivce: TeamManagerService;

    constructor(){
        this.teamManagerSerivce = new TeamManagerService();
    }


    register: RequestHandler = async (req, res) => {
        try {
            const user = await this.teamManagerSerivce.createUser(req.body);
            logger.info('User Registered Successfully',{
                message: `User Data ${user}`
            })
            res.status(201).json({
                success: true,
                data: user
            });
        } catch(e) {
            if(e instanceof DuplicateError) {
                logger.error('Email Already Exsists');
                res.status(409).json({
                    success: false,
                    message: e.message
                });
            }
            else if(e instanceof ValidationError) {
                logger.error(e.message);
                res.status(400).json({
                    success: false,
                    message: e.message
                });
            }
            else {
                logger.error('Server Error',{
                    message: e
                });
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            }
        }
    }
    
    getManager: RequestHandler = async(req, res)=>{
        try {
            const teamManagers = await this.teamManagerSerivce.fetchManagers();
            res.status(201).json({
                success: true,
                data: teamManagers
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }

    assignManager: RequestHandler = async(req, res)=>{
        try {
            const data = await this.teamManagerSerivce.assignWorkSpace(req.body);
            res.status(201).json({
                success: true,
                data: data
            })
        } catch (error) {
            if(error instanceof ValidationError){
                res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
            else if(error instanceof NotFoundError){
                res.status(409).json({
                    success: false,
                    message: error.message
                })
            }else{
                res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                })
            }
        }
    }
}