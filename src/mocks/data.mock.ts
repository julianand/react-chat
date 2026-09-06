import type { Conversation, Message, User, UserConversation } from "../types";

export const conversationsMock: Conversation[] = [
  { id: "c1" },
  { id: "c2" },
  { id: "c3" },
];

export const usersMock: User[] = [
  { id: "u0", name: "Me", avatarColor: "#ec7e7e" },
  { id: "u1", name: "Emily Carter", avatarColor: "#f56a00" },
  { id: "u2", name: "Frontend Team", avatarColor: "#1677ff" },
  { id: "u3", name: "David Brown", avatarColor: "#52c41a" },
];

export const userConversationMock: UserConversation[] = [
  { userId: 'u0', conversationId: 'c1', read: true },
  { userId: 'u1', conversationId: 'c1', read: true },
  { userId: 'u0', conversationId: 'c2', read: true },
  { userId: 'u2', conversationId: 'c2', read: true },
  { userId: 'u0', conversationId: 'c3', read: true },
  { userId: 'u3', conversationId: 'c3', read: true },
];

export const messagesMock: Message[] = [
  {
    id: "m1",
    userId: "u1",
    conversationId: "c1",
    text: "Hey! Did you see the design I sent you?",
    timestamp: "2026-09-05T09:12:00",
  },
  {
    id: "m2",
    userId: "u0",
    conversationId: "c1",
    text: "Yes, I love it. Shall we tweak the button colors?",
    timestamp: "2026-09-05T09:15:00",
  },
  {
    id: "m3",
    userId: "u1",
    conversationId: "c1",
    text: "Perfect, we'll stick with the primary blue then.",
    timestamp: "2026-09-05T09:16:00",
  },
  {
    id: "m4",
    userId: "u0",
    conversationId: "c1",
    text: "Great, I'll hand it over to development today.",
    timestamp: "2026-09-05T09:20:00",
  },
  {
    id: "m5",
    userId: "u2",
    conversationId: "c2",
    text: "Did anyone review the integration PR?",
    timestamp: "2026-09-05T10:02:00",
  },
  {
    id: "m6",
    userId: "u0",
    conversationId: "c2",
    text: "I'm on it now, I'll comment in a moment.",
    timestamp: "2026-09-05T10:05:00",
  },
  {
    id: "m7",
    userId: "u2",
    conversationId: "c2",
    text: "Perfect, thanks 🙌",
    timestamp: "2026-09-05T10:06:00",
  },
  {
    id: "m8",
    userId: "u3",
    conversationId: 'c3',
    text: "We're on for Thursday's demo, does that work for you?",
    timestamp: "2026-09-04T11:00:00",
  },
  {
    id: "m9",
    userId: "u0",
    conversationId: 'c3',
    text: "Thursday at 11 works perfectly for me.",
    timestamp: "2026-09-04T11:00:00",
  },
  {
    id: "m10",
    userId: "u3",
    conversationId: 'c3',
    text: "Done, I'll send you the invite.",
    timestamp: "2026-09-04T11:00:00",
  },
];
