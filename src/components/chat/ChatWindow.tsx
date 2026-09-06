import { Typography } from 'antd'
import MessageComposer from './MessageComposer'
import MessageRow from './MessageRow'
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { conversationApi } from '../../store/conversations.api';
import { messageApi } from '../../store/messages.api';

const { Title } = Typography;

function ChatWindow() {
  const activeConversationId = useSelector((state: RootState) => state.ui.activeConversationId);
  const { data: messages, isFetching } = messageApi.useGetMessagesQuery(activeConversationId!);
  const { conversation } = conversationApi.useGetConversationsQuery('u0', {
    selectFromResult: ({ data }) => ({
      conversation: data?.find(uc => uc.conversationId === activeConversationId)?.conversation
    })
  });

  if (!activeConversationId || !conversation || !messages?.length || isFetching) return;

  return (
    <div className="chat-window">
      <header className="chat-window__header">
        <Title level={5} className="chat-window__title">
          {conversation.name}
        </Title>
      </header>
      <div className="chat-window__messages">
        {messages.map((message) => (
          <MessageRow
            key={message.id}
            message={message}
            peerName={conversation.name!}
            peerColor={conversation.color!}
          />
        ))}
      </div>
      <MessageComposer/>
    </div>
  )
}

export default ChatWindow