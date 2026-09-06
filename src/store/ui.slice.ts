import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { conversationApi } from "./conversations.api";

interface UIStore {
  activeConversationId?: string;
};

const initialState: UIStore = {};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveConversation(state, action: PayloadAction<string>) {
      state.activeConversationId = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(conversationApi.endpoints.getConversations.matchFulfilled, (state, action) => {
      if (state.activeConversationId) return;
      const first = action.payload[0];
      if (first) state.activeConversationId = first.conversationId;
    });
  },
});

export const { setActiveConversation } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;