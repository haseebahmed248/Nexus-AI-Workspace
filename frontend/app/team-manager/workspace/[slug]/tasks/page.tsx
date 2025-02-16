import TasksModal from "@/components/features/team-manager/Tasks/TasksModal";
import TeamTasksTable from "@/components/features/team-manager/teamTasksTable";
import React from "react";

function page() {
  return (
    <div className="w-full h-full text-gray-600">
      <div className="w-full">
        <TasksModal />
      </div>

      {/* -----------Line Space---------- */}
      <div className="w-full bg-gray-200 h-0.5 mt-4 mb-4"></div>

      <TeamTasksTable />
    </div>
  );
}

export default page;
