import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setActiveConversation } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;