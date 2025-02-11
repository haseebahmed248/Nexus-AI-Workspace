"use client";
import { ChevronUp, ArrowLeft, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

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

  const dummyMessages: User[] = [
    {
      id: 1,
      name: "John Doe",
      message: "Hey, how are you?",
      date: "Nov 8, 2024",
      avatar: "J",
      online: true,
      messages: [
        {
          id: 1,
          text: "Hey, how are you?",
          sender: "John",
          timestamp: "10:00 AM",
        },
        {
          id: 2,
          text: "I'm good, thanks!",
          sender: "me",
          timestamp: "10:01 AM",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "Looking forward to our meeting",
      date: "Nov 7, 2024",
      avatar: "J",
      online: false,
      messages: [
        {
          id: 1,
          text: "Can we meet tomorrow?",
          sender: "Jane",
          timestamp: "9:00 AM",
        },
        { id: 2, text: "Sure, what time?", sender: "me", timestamp: "9:05 AM" },
      ],
    },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    // Here you would typically send the message to your backend
    // For now, we'll just clear the input
    setNewMessage("");
  };

  const MessagePanel = ({ user }: { user: User }) => (
    <div className="h-96 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 flex items-center gap-3">
        <button
          onClick={() => setSelectedUser(null)}
          className="hover:bg-gray-100 p-1 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              {user.avatar}
            </div>
            {user.online && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          <h3 className="font-medium">{user.name}</h3>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {user.messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Write a message..."
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

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
            <MessagePanel user={selectedUser} />
          ) : (
            <div className="h-96">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-medium">Messages</h3>
              </div>
              <div className="overflow-y-auto">
                {dummyMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedUser(msg)}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        {msg.avatar}
                      </div>
                      {msg.online && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-sm truncate">
                          {msg.name}
                        </p>
                        <span className="text-xs text-gray-500">
                          {msg.date}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Transition>
    </div>
  );
}

export default UserModal;
