import { TeamManagerController } from '@/controllers/teamManagerController';
import express from 'express'

const teamManagerRouter = express.Router();
const teamManagerController = new TeamManagerController();


teamManagerRouter.post('/register', teamManagerController.register);



export default teamManagerRouter;