import { createApi } from "@reduxjs/toolkit/query/react";
import { getMockBaseFn } from "./store.utils";
import type { Message } from "../types";
import { db } from "../mocks/db.mock";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: getMockBaseFn,
  tagTypes: ["message"],
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], string>({
      query: (conversationId) => () => db.getMessages(conversationId),
    }),
    sendMessage: builder.mutation<Message, Parameters<typeof db.sendMessage>[0]>({
      query: (params) => () => db.sendMessage(params),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(
          messageApi.util.updateQueryData("getMessages", params.conversationId, (draft) => {
            draft.push(data);
          }),
        );
      },
    }),
  }),
});
