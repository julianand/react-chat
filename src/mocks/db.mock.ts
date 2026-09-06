import type { Conversation, Message, UserConversation } from "../types";
import { conversationsMock, messagesMock, userConversationMock, usersMock } from "./data.mock";

class DBMock {
  private conversations = conversationsMock;
  private users = usersMock;
  private userConversations = userConversationMock;
  private messages = messagesMock;

  private getConversationData(conversationId: string, userId: string): Conversation | undefined {
    const conversation = this.conversations.find((c) => c.id === conversationId);
    if (!conversation) return;

    const lastMessage = this.messages.filter((m) => m.conversationId === conversationId).pop();
    const otherUser = this.userConversations
      .filter((uc) => uc.conversationId === conversation.id && uc.userId !== userId)
      .map((uc) => this.users.find((u) => u.id === uc.userId))[0];

    return {
      ...conversation,
      lastMessage,
      name: otherUser?.name,
      color: otherUser?.avatarColor,
      otherUserId: otherUser?.id,
    };
  }

  public getConversations(userId: string): UserConversation[] {
    console.log(`fetched getConversations(${userId})`);

    const conversations = this.userConversations
      .filter((uc) => uc.userId === userId)
      .map((uc) => ({
        ...uc,
        conversation: this.getConversationData(uc.conversationId, userId),
      }));

    return conversations;
  }

  private setConversationRead({
    userId,
    userType,
    conversationId,
    value,
  }: {
    userId: string;
    userType: "current" | "other";
    conversationId: string;
    value: boolean;
  }): UserConversation | undefined {
    const index = this.userConversations.findIndex((uc) => {
      let condition = uc.conversationId === conversationId;

      if (userType === "current") condition &&= uc.userId === userId;
      else condition &&= uc.userId !== userId;

      return condition;
    });

    if (index === -1) return;

    const newArr = this.userConversations.concat();
    const newUc = {
      ...newArr[index],
      read: value,
    };

    newArr.splice(index, 1, newUc);
    this.userConversations = newArr;

    return newUc;
  }

  public markAsRead({
    userId,
    conversationId,
  }: {
    userId: string;
    conversationId: string;
  }): UserConversation | undefined {
    console.log(`fetched markAsRead(${userId}, ${conversationId})`);
    const uc = this.setConversationRead({ userId, userType: 'current', conversationId, value: true });

    return uc;
  }

  public getMessages(conversationId: string) {
    console.log(`fetched getMessages(${conversationId})`);

    const messages = this.messages.filter((m) => m.conversationId === conversationId);
    return messages;
  }

  public sendMessage({
    conversationId,
    userId,
    text,
  }: {
    conversationId: string;
    userId: string;
    text: string;
  }) {
    console.log(`fetched sendMessage(${conversationId}, ${userId}, ${text})`);

    const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let id = "";

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      id += chars[randomIndex];
    }

    const message: Message = {
      id,
      userId,
      conversationId,
      text,
      timestamp: new Date().toISOString(),
    };

    this.messages.push(message);
    this.setConversationRead({ userId, userType: 'other', conversationId, value: false });

    return message;
  }
}

export const db = new DBMock();
