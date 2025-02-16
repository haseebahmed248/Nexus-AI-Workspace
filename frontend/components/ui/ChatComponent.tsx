"use client";
import { getWorkspaceMembers } from "@/lib/api/work-space";
import { RoomManager } from "@/lib/utils/socket/room";
import { useSocket } from "@/lib/utils/socket/useSocket";
import { ChatProps, Message } from "@/types/conversation";
import { useCallback, useEffect } from "react";

export function ChatComponnet({
  currentUserId,
  recipientId,
  chatType,
  groupId,
}: ChatProps) {
  const { emit, on, off } = useSocket();
  let roomId: string;

  useEffect(() => {
    switch (chatType) {
      case "direct":
        roomId = RoomManager.createDirectMessageRoomId(
          currentUserId,
          recipientId ?? ""
        );
        break;
      case "group":
        roomId = RoomManager.createGroupRoomId(groupId ?? "");
        break;
      default:
        throw new Error("Invalide Chat Type");
    }
    emit("joinRoom", roomId);

    on("recieveMessage", (message: Message) => {
      console.log(`Message in room ${roomId}:`, message);
    });

    return () => {
      off("recieveMessage");
    };
  }, [currentUserId, recipientId, chatType, groupId, emit, on, off]);

  useEffect(() => {
    const x = async () => {
      const data = await getWorkspaceMembers();
      console.log("data", data);
    };
    x();
  }, []);
  const sendMessage = (text: string) => {
    const message: Message = {
      text,
      sender: currentUserId,
      room: roomId,
      timestamp: new Date(),
    };
    emit("sendMessage", message);
  };

  return (
    <div>
      {/* <Transition
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
            <MessagePanel user={selectedUser} />
          ) : (
            // <div className="h-96">
            //   <div className="p-3 border-b border-gray-200">
            //     <h3 className="font-medium">Messages</h3>
            //   </div>
            //   <div className="overflow-y-auto">
            //     {dummyMessages.map((msg) => (
            //       <div
            //         key={msg.id}
            //         className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
            //         onClick={() => setSelectedUser(msg)}
            //       >
            //         <div className="relative">
            //           <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            //             {msg.avatar}
            //           </div>
            //           {msg.online && (
            //             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
            //           )}
            //         </div>
            //         <div className="flex-1 min-w-0">
            //           <div className="flex justify-between items-start">
            //             <p className="font-medium text-sm truncate">
            //               {msg.name}
            //             </p>
            //             <span className="text-xs text-gray-500">
            //               {msg.date}
            //             </span>
            //           </div>
            //           <p className="text-sm text-gray-500 truncate">
            //             {msg.message}
            //           </p>
            //         </div>
            //       </div>
            //     ))}
            //   </div>
            // </div>
            ""
          )}
        </div>
      </Transition> */}
    </div>
  );
}
