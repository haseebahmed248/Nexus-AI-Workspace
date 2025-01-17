import express, { Application } from "express";
import dotenv from 'dotenv'
import router from "./api/test";
import useRouter from "./api/user";
import bodyParser from "body-parser";
import cors from 'cors'
import adminRouter from "./api/admin";
import teamManagerRouter from "./api/team-manager";


class Server {
    private app! : Application;
    private PORT! : string | number;

    constructor(){
        this.setupDotEnv();
        this.setupExpress();
        this.setupMiddlewares();
        this.setupCros();
        this.setupRoutes();
    }

    private setupCros(){
        this.app.use(cors({
            origin: process.env.FRONTEND_URL,
            methods: ['GET','PUT','POST', 'DELETE'],
            credentials: true
        }))
    }

    private setupDotEnv(){
        dotenv.config();
        this.PORT = process.env.PORT || 4000;
    }

    private setupExpress(){
        this.app = express();
    }

    private setupMiddlewares(){
        this.app.use(bodyParser.json())
    }

    private setupRoutes(){
        this.app.use("/", router)
        this.app.use("/api",useRouter)
        this.app.use("/api/admin",adminRouter);
        this.app.use("/api/team-manager",teamManagerRouter);
    }    

    public async start(){
        try{
            this.app.listen(this.PORT, ()=>{
                console.log(`Server running on port ${this.PORT}`)
            })
        }catch(e){
            console.log(`Error starting the server : ${e}`)
        }
    }

    public getApp(): Application{
        return this.app;
    }
}

const server = new Server();  
server.start();

export default server.getApp();
