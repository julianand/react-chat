export interface Message {
  id: string;
  userId: string;
  conversationId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;

  // computed
  lastMessage?: Message;
  name?: string;
  color?: string;
}

export interface User {
  id: string;
  name: string;
  avatarColor: string;
}

export interface UserConversation {
  userId: string;
  conversationId: string;
  read?: boolean;

  // computed
  conversation?: Conversation;
}
