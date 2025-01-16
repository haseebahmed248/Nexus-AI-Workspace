import { AdminController } from "@/controllers/adminController";
import { WorkSpaceController } from "@/controllers/workSpaceController";
import { adminAuthMiddleware } from "@/middlewares/authMiddleware";
import express from "express";

const adminRouter = express.Router();
const adminController = new AdminController();
const workSpaceController = new WorkSpaceController();


adminRouter.post('/register',adminController.registerAdmin);

adminRouter.get('/getUsers', adminAuthMiddleware ,adminController.getAdminUsers);


//WorkSpaces
adminRouter.post('/createWorkSpace', adminAuthMiddleware, workSpaceController.createWorkSpace);
adminRouter.get('/getWorkSpaces', adminAuthMiddleware, workSpaceController.getWorkSpaces);

export default adminRouter;