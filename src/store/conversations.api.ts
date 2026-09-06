import { createApi } from "@reduxjs/toolkit/query/react";
import type { UserConversation } from "../types";
import { db } from "../mocks/db.mock";
import { getMockBaseFn } from "./store.utils";

export const conversationApi = createApi({
  reducerPath: "conversationApi",
  baseQuery: getMockBaseFn,
  tagTypes: ["conversation"],
  endpoints: (builder) => ({
    getConversations: builder.query<UserConversation[], string>({
      query: (userId) => () => db.getConversations(userId),
      providesTags(result) {
        return (result ?? []).map((uc) => ({ type: "conversation", id: uc.conversationId }));
      },
    }),
    markAsRead: builder.mutation<UserConversation | undefined, Parameters<typeof db.markAsRead>[0]>(
      {
        query: (params) => () => db.markAsRead(params),
        invalidatesTags: (result) =>
          result ? [{ type: "conversation", id: result.conversationId }] : [],
      },
    ),
  }),
});
