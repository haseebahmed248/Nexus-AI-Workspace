import { AdminController } from "@/controllers/adminController";
import express from "express";

const adminRouter = express.Router();
const adminController = new AdminController();


adminRouter.post('/register',adminController.registerAdmin);

export default adminRouter;