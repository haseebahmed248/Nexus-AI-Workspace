import { Prisma } from "@prisma/client";
import { CreateUserDTO } from "./user.dto";

export interface CreateWorkSpaceDTO{
    id?: number;
    name: string;
    description: string;
    createBy: string;
    updatedAt: Date;
    settings?: Prisma.JsonValue;
}
