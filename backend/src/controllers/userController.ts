import {  RequestHandler } from "express";
import { UserService } from "@/services/userService";
import { DuplicateEmailError, ValidationError } from "@/utils/error";
import { logger } from "@/lib/logger";

export class UserController {
    private userService: UserService;
    
    constructor() {
        this.userService = new UserService();
    }

    register: RequestHandler = async (req, res) => {
        try {
            const user = await this.userService.createUser(req.body);
            logger.info('User Registered Successfully',{
                message: `User Data ${user}`
            })
            res.status(201).json({
                success: true,
                data: user
            });
        } catch(e) {
            if(e instanceof DuplicateEmailError) {
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

    login: RequestHandler = async(req, res) =>{
        try{
            const user = await this.userService.loginUser(req.body);
            logger.info('User Logged In',{
                userId: user.id,
                email: user.email
            });
            res.status(201).json({
                success: false,
                data: user
            })
        }catch(e){
            if(e instanceof ValidationError){
                logger.error(e);
                res.status(400).json({
                    success: false,
                    message: e.message
                })
            }
            else{
                logger.error('Internal Server Error',{
                    data: e
                });
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                })
            }
        }
    }

    resetRequest: RequestHandler = async(req, res)=>{
        try{
            await this.userService.resetRequest(req.body);
            logger.info("Email Sent For Reset",{
                data: req.body.email
            })
            res.status(201).json({
                success: true,
                data: "Email has been send!"
            });
        }catch(e){
            if(e instanceof ValidationError){
                logger.error('Email Field is Empty');
                res.status(400).json({
                    success: false,
                    message: e.message
                })
            }
            else{
                logger.error('Internal Server Error',{
                    message: e
                });
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                })
            }
        }   
    }
}