import { TeamManagerController } from '@/controllers/teamManagerController';
import { WorkSpaceController } from '@/controllers/workSpaceController';
import express from 'express'

const teamManagerRouter = express.Router();
const teamManagerController = new TeamManagerController();
const workSpaceController = new WorkSpaceController();

teamManagerRouter.post('/register', teamManagerController.register);
teamManagerRouter.get('/getWorkSpaces/:email',workSpaceController.getSpecificWorkSpaces);


export default teamManagerRouter;