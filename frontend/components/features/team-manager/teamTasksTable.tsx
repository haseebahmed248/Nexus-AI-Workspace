"use client";
import Button from "@/components/ui/Button";
import { DataTable } from "@/components/ui/table/DataTable";
import {
  Description,
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  Textarea,
  Transition,
} from "@headlessui/react";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { Fragment, useState } from "react";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface WorkSpaceTask {
  id: string;
  name: string;
  assignedTo: string;
  deadLine: Date;
  status: string;
  description?: string;
}

function TeamTasksTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<WorkSpaceTask | null>(null);

  const tempData = [
    {
      id: "1",
      name: "Test Task",
      assignedTo: "Ahmed",
      deadLine: new Date("2025-06-01"),
      status: "OnGoing",
      description: "Hello world how is it going",
    },
  ];

  const columns: Column<WorkSpaceTask>[] = [
    {
      key: "name" as keyof WorkSpaceTask,
      header: "Name",
      sortable: true,
    },
    {
      key: "assignedTo" as keyof WorkSpaceTask,
      header: "AssignedTo",
      sortable: true,
    },
    {
      key: "deadline" as keyof WorkSpaceTask,
      header: "DeadLine",
      render: (user: WorkSpaceTask) => (
        <span
          className={`px-3 py-2 rounded-md ${user.deadLine.getTime() > Date.now() ? " bg-red-300 " : " bg-green-300"}`}
        >
          {new Date(user.deadLine).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status" as keyof WorkSpaceTask,
      header: "Status",
      render: (item: WorkSpaceTask) => (
        <span
          className={`px-3 py-2 rounded-md ${item.status === "OnGoing" ? `bg-green-300` : "bg-red-500"}`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  const handleRowClick = (task: WorkSpaceTask) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  return (
    <div className="w-full mt-6">
      <div>
        <h1 className="font-bold text-xl">Completed Tasks</h1>
      </div>
      <DataTable
        columns={columns}
        data={tempData}
        onRowClick={handleRowClick}
      />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-96 bg-gray-100 shadow-xl text-gray-600">
                    <div className="p-4 flex justify-between text-red-500">
                      <Cross2Icon
                        width={25}
                        height={25}
                        className="cursor-pointer hover:scale-110 hover:text-red-600"
                        onClick={() => setIsOpen(false)}
                      />
                      <DialogTitle className="p-1 font-semibold text-gray-600">
                        Task Details
                      </DialogTitle>
                    </div>
                    <DialogPanel className="p-6">
                      <div>
                        <label title="name">Title</label>
                        <input
                          className="border border-gray-300 rounded-md w-full bg-transparent p-2"
                          value={selectedTask?.name}
                          id="name"
                          onChange={(e) => {
                            if (selectedTask) {
                              setSelectedTask({
                                ...selectedTask,
                                name: e.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <div className="flex my-3 justify-between">
                        <label title="status" className="py-2">
                          Status:
                        </label>
                        <input
                          className={`border-none w-24 font-bold  text-center
                                ${selectedTask?.status === "Completed" ? "bg-green-400" : selectedTask?.status === "OnGoing" ? "bg-yellow-300" : "bg-red-500"}
                                rounded-md p-2`}
                          value={selectedTask?.status}
                          disabled
                          id="status"
                          onChange={(e) => {
                            if (selectedTask) {
                              setSelectedTask({
                                ...selectedTask,
                                status: e.target.value,
                              });
                            }
                          }}
                        />
                      </div>

                      <div className="flex my-3 justify-between">
                        <label title="assignedTo" className="py-2">
                          AssignedTo:
                        </label>
                        <input
                          className={`border-none w-24 font-bold bg-gray-300 text-center rounded-md p-2`}
                          value={selectedTask?.assignedTo}
                          disabled
                          id="assignedTo"
                          onChange={(e) => {
                            if (selectedTask) {
                              setSelectedTask({
                                ...selectedTask,
                                status: e.target.value,
                              });
                            }
                          }}
                        />
                      </div>

                      <div className="flex my-3 w-full justify-between">
                        <label title="deadline" className="py-2">
                          DeadLine:
                        </label>
                        <input
                          className={`border-none w-24 font-bold text-center rounded-md p-2
                                ${selectedTask?.deadLine && selectedTask.deadLine.getTime() > Date.now() ? "bg-red-300" : "bg-green-300"}
                                `}
                          value={
                            selectedTask?.deadLine
                              ? new Date(
                                  selectedTask.deadLine
                                ).toLocaleDateString()
                              : ""
                          }
                          disabled
                          id="deadline"
                          onChange={(e) => {
                            if (selectedTask) {
                              setSelectedTask({
                                ...selectedTask,
                                status: e.target.value,
                              });
                            }
                          }}
                        />
                      </div>

                      <div>
                        <label title="description">Description</label>
                        <Textarea
                          className="border border-gray-300 rounded-md w-full bg-transparent p-2"
                          rows={3}
                          value={selectedTask?.description}
                          id="description"
                          onChange={(e) => {
                            if (selectedTask) {
                              setSelectedTask({
                                ...selectedTask,
                                description: e.target.value,
                              });
                            }
                          }}
                        />
                      </div>
                      <Button variant="tertiory" className="mt-5">
                        Save
                      </Button>
                    </DialogPanel>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default TeamTasksTable;
