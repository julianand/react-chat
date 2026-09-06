import { configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "./ui.slice";
import { conversationApi } from "./conversations.api";
import { messageApi } from "./messages.api";

export const store = configureStore({
  reducer: {
    [conversationApi.reducerPath]: conversationApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
    .concat(conversationApi.middleware)
    .concat(messageApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;