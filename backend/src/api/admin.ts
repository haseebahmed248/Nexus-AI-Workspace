import { AdminController } from "@/controllers/adminController";
import { TeamManagerController } from "@/controllers/teamManagerController";
import { WorkSpaceController } from "@/controllers/workSpaceController";
import { adminAuthMiddleware } from "@/middlewares/authMiddleware";
import express from "express";

const adminRouter = express.Router();
const adminController = new AdminController();
const workSpaceController = new WorkSpaceController();
const teamManagerController = new TeamManagerController();


adminRouter.post('/register',adminController.registerAdmin);

adminRouter.get('/getUsers', adminAuthMiddleware ,adminController.getAdminUsers);


//WorkSpaces
adminRouter.post('/createWorkSpace', adminAuthMiddleware, workSpaceController.createWorkSpace);
adminRouter.get('/getWorkSpaces', adminAuthMiddleware, workSpaceController.getWorkSpaces);

//TeamManagers
adminRouter.get('/getTeamManagers',adminAuthMiddleware, teamManagerController.getManager);
adminRouter.put('/assignTeamManager',adminAuthMiddleware,teamManagerController.assignManager);


export default adminRouter;