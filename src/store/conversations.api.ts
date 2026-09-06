import { createApi } from "@reduxjs/toolkit/query/react";
import type { UserConversation } from "../types";
import { db } from "../mocks/db.mock";
import { setActiveConversation } from "./ui.slice";
import type { RootState } from "./store";
import { getMockBaseFn } from "./store.utils";

export const conversationApi = createApi({
  reducerPath: 'conversationApi',
  baseQuery: getMockBaseFn,
  endpoints: (builder) => ({
    getConversations: builder.query<UserConversation[], string>({
      query: (userId) => (() => db.getConversations(userId)),
      onQueryStarted: async (_, { dispatch, getState, queryFulfilled }) => {
        const state = getState() as RootState;
        if (state.ui.activeConversationId) return;

        const { data } = await queryFulfilled;
        dispatch(setActiveConversation(data[0]?.conversationId));
      }
    }),
  })
});