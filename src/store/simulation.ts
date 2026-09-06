import { createAsyncThunk } from "@reduxjs/toolkit";
import { messageApi } from "./messages.api";
import { store } from "./store";
import { conversationApi } from "./conversations.api";

export const simulateMessage = createAsyncThunk<void, { conversationId: string; userId: string }>(
  "messages/fetchFake",
  async ({ conversationId, userId }, { dispatch }) => {
    const randomId = Math.floor(Math.random() * 340) + 1;
    const { body } = await fetch("https://dummyjson.com/comments/" + randomId).then((res) =>
      res.json(),
    );

    dispatch(messageApi.endpoints.sendMessage.initiate({ conversationId, userId, text: body }));
  },
);

export function startMessageSimulation() {
  const interval = setInterval(() => {
    const state = store.getState();
    const selectConversations = conversationApi.endpoints.getConversations.select("u0");
    const { data } = selectConversations(state);

    if (!data?.length) return;

    const randomIndex = Math.floor(Math.random() * data.length);
    const { conversation } = data[randomIndex];

    store.dispatch(
      simulateMessage({ conversationId: conversation!.id, userId: conversation!.otherUserId! }),
    );
  }, 10000);

  return () => clearInterval(interval);
}
