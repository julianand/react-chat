import { Spin, Typography } from 'antd'
import MessageComposer from './MessageComposer'
import MessageRow from './MessageRow'
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { conversationApi } from '../../store/conversations.api';
import { messageApi } from '../../store/messages.api';
import { useEffect } from 'react';

const { Title } = Typography;

function ChatWindow() {
  const activeConversationId = useSelector((state: RootState) => state.ui.activeConversationId);
  const { data: messages, isFetching } = messageApi.useGetMessagesQuery(activeConversationId!);
  const [markAsRead] = conversationApi.useMarkAsReadMutation();
  const { uc } = conversationApi.useGetConversationsQuery('u0', {
    selectFromResult: ({ data }) => ({
      uc: data?.find(uc => uc.conversationId === activeConversationId),
    })
  });

  useEffect(() => {
    if (!uc || uc.read) return;
    markAsRead({ userId: uc.userId, conversationId: uc.conversationId });
  }, [uc])

  if (!activeConversationId) return;

  return (
    <div className="chat-window">
      <header className="chat-window__header">
        <Title level={5} className="chat-window__title">
          {uc?.conversation?.name ?? ''}
        </Title>
      </header>
      <div className="chat-window__messages">
        {isFetching ? (
          <div className="chat-window__loading">
            <Spin size="large" />
          </div>
        ) : (
          messages?.map((message) => (
            <MessageRow
              key={message.id}
              message={message}
              peerName={uc?.conversation?.name ?? ''}
              peerColor={uc?.conversation?.color ?? ''}
            />
          ))
        )}
      </div>
      <MessageComposer/>
    </div>
  )
}

export default ChatWindow