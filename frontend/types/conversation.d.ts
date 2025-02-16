export interface Message {
  // id: string;
  text: string;
  sender: string;
  room: string;
  timestamp: Date;
}

export interface Room {
  id: string;
  type: "direct" | "group";
  participants: string[];
}

interface ChatProps {
  currentUserId: string;
  recipientId?: string; // Optional for group chats
  chatType: "direct" | "group";
  groupId?: string; // Required only for group chats
}
