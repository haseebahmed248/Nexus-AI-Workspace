import { TestService } from "@/services/testService";
import { Request, Response } from "express"



export class testController{
    private testservice : TestService;
    constructor(){
        this.testservice = new TestService();
    }
    increment = async (req: Request, res: Response) => { 
        try {
            const data = await this.testservice.updateCounter();
            res.json(data);
        } catch (e) {
            console.log(`Error incrementing ${e}`);
            res.status(500).json({ error: 'Failed to increment' });
        }
    }
}