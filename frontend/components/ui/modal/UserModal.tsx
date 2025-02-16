"use client";
import { ChevronUp, ArrowLeft, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { Tab, TabGroup, TabList, Transition } from "@headlessui/react";
import { useSocket } from "@/lib/utils/socket/useSocket";
import { Message } from "@/types/conversation";
import { ChatComponnet } from "../ChatComponent";

interface User {
  id: number;
  name: string;
  message: string;
  date: string;
  avatar: string;
  online: boolean;
  messages?: Message[];
}

function UserModal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const { on, emit, off } = useSocket();

  useEffect(() => {
    on("connect", () => {
      console.log(`Connected`);
    });
  }, [on, off]);

  return (
    <div className="fixed bottom-0 right-0 mr-5 text-gray-500">
      {/* Profile Button that moves up */}
      <div
        className="transition-transform duration-300 ease-in-out"
        style={{
          transform: isOpen ? "translateY(-364px)" : "translateY(0)",
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-80 bg-white rounded-t-md text-gray-600 p-2 border border-gray-200 flex justify-between items-center hover:bg-gray-50 transition-colors mb-5"
        >
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {session?.user?.name?.[0]?.toUpperCase() || "A"}
              </span>
            </div>
            <h3 className="text-sm font-medium">
              {session?.user?.name || "User"}
            </h3>
          </div>

          <ChevronUp
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Message List/Chat Panel */}
      <Transition
        as={Fragment}
        show={isOpen}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <div className="absolute bottom-0 w-80 bg-white rounded-t-md border border-gray-200 shadow-lg">
          {selectedUser ? (
            // <MessagePanel user={selectedUser} />
            ""
          ) : (
            <div className="h-96">
              <div className="w-full p-3 border-b border-gray-200 ">
                <TabGroup>
                  <TabList className={"flex justify-between"}>
                    <Tab
                      className={
                        "bg-gray-50 hover:gray-100 hover:shadow-md transition-all duration-300 p-2 rounded-md"
                      }
                    >
                      Team
                    </Tab>
                    <Tab>Messages</Tab>
                  </TabList>
                </TabGroup>
              </div>
              <div className="overflow-y-auto"></div>
            </div>
          )}
        </div>
      </Transition>
    </div>
  );
}

export default UserModal;
