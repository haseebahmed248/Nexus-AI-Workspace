import { prisma } from "@/lib/prisma";
import { CreateWorkSpaceDTO } from "@/types/workspace.dto";
import { DuplicateError, ValidationError, NotFoundError } from "@/utils/error";

export class WorkSpaceService {
  async makeWorkSpace(data: CreateWorkSpaceDTO) {
    if (!data.name) {
      throw new ValidationError("Name is required");
    }
    if (!data.description) {
      throw new ValidationError("Description is required");
    }
    if (!data.createBy) {
      throw new ValidationError("Admin Email is required");
    }
    const duplicateCheck = await prisma.workSpaces.findFirst({
      where: {
        name: data.name,
      },
    });
    if (duplicateCheck) {
      throw new DuplicateError("Workspace already exsist with this name");
    }
    const workspace = await prisma.workSpaces.create({
      data: {
        name: data.name,
        description: data.description,
        createdBy: data.createBy,
        createdAt: new Date(),
      },
    });
    return workspace;
  }

  async findWorkSpaces() {
    const workspace = await prisma.workSpaces.findMany();
    return workspace;
  }

  async findAssignedWorkSpaces(data: string) {
    const workspace = await prisma.workSpaces.findMany({
      where: {
        assignedTo: data,
      },
    });
    return workspace;
  }

  async updateWorkSpace(data: CreateWorkSpaceDTO) {
    if (!data.name) {
      throw new ValidationError("WorkSpace Name Is Required");
    }
    const findWorkSpace = await prisma.workSpaces.findFirst({
      where: {
        id: data.id,
      },
    });
    if (!findWorkSpace) {
      throw new NotFoundError("No such workSpace Exsists");
    }
    const updatedWorkSpace = await prisma.workSpaces.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        settings: data.settings ? data.settings : "",
      },
    });
    return updatedWorkSpace;
  }

  //WorkSpace users Crud
  async getWorkspaceUsers(workspaceId: number) {
    if (!workspaceId) {
      throw new ValidationError(`Workspace Id is Required`);
    }
    const users = await prisma.workSpaceMembers.findMany({
      where: {
        workspaceId: workspaceId,
      },
      include: {
        user: true, // This would require setting up the relation first
      },
    });
    return users;
  }
}
