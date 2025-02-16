-- AddForeignKey
ALTER TABLE "WorkSpaceMembers" ADD CONSTRAINT "WorkSpaceMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkSpaceMembers" ADD CONSTRAINT "WorkSpaceMembers_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "WorkSpaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
