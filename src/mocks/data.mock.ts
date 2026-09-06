import type { Conversation, Message, User, UserConversation } from "../types";

export const conversationsMock: Conversation[] = [
  { id: "c1" },
  { id: "c2" },
  { id: "c3" },
];

export const usersMock: User[] = [
  { id: "u0", name: "Me", avatarColor: "#ec7e7e" },
  { id: "u1", name: "María Gómez", avatarColor: "#f56a00" },
  { id: "u2", name: "Equipo Frontend", avatarColor: "#1677ff" },
  { id: "u3", name: "Carlos Ruiz", avatarColor: "#52c41a" },
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
    text: "Hola! ¿Viste el diseño que te envié?",
    timestamp: "2026-09-05T09:12:00",
  },
  {
    id: "m2",
    userId: "u0",
    conversationId: "c1",
    text: "Sí, me encanta. ¿Ajustamos los colores del botón?",
    timestamp: "2026-09-05T09:15:00",
  },
  {
    id: "m3",
    userId: "u1",
    conversationId: "c1",
    text: "Perfecto, lo dejamos con el azul primario entonces.",
    timestamp: "2026-09-05T09:16:00",
  },
  {
    id: "m4",
    userId: "u0",
    conversationId: "c1",
    text: "Genial, lo paso a desarrollo hoy mismo.",
    timestamp: "2026-09-05T09:20:00",
  },
  {
    id: "m5",
    userId: "u2",
    conversationId: "c2",
    text: "¿Alguien revisó el PR de la integración?",
    timestamp: "2026-09-05T10:02:00",
  },
  {
    id: "m6",
    userId: "u0",
    conversationId: "c2",
    text: "Lo estoy revisando ahora, en un momento comento.",
    timestamp: "2026-09-05T10:05:00",
  },
  {
    id: "m7",
    userId: "u2",
    conversationId: "c2",
    text: "Perfecto, gracias 🙌",
    timestamp: "2026-09-05T10:06:00",
  },
  {
    id: "m8",
    userId: "u3",
    conversationId: 'c3',
    text: "Quedamos el jueves para la demo, ¿te viene bien?",
    timestamp: "2026-09-04T11:00:00",
  },
  {
    id: "m9",
    userId: "u0",
    conversationId: 'c3',
    text: "Jueves a las 11 me viene perfecto.",
    timestamp: "2026-09-04T11:00:00",
  },
  {
    id: "m10",
    userId: "u3",
    conversationId: 'c3',
    text: "Listo, te mando la invitación.",
    timestamp: "2026-09-04T11:00:00",
  },
];
