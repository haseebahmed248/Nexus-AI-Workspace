//------------NEED to setup middleware Authentication for protected Routes-----------------------

import { TeamManagerController } from "@/controllers/teamManagerController";
import { WorkSpaceController } from "@/controllers/workSpaceController";
import express from "express";

const teamManagerRouter = express.Router();
const teamManagerController = new TeamManagerController();
const workSpaceController = new WorkSpaceController();

teamManagerRouter.post("/register", teamManagerController.register);
teamManagerRouter.get(
  "/getWorkSpaces/:email",
  workSpaceController.getSpecificWorkSpaces
);

//Workspace Users Crud
teamManagerRouter.get(
  "/getWorkspaceMember/:id",
  workSpaceController.getWorkspaceUsers
);

export default teamManagerRouter;
