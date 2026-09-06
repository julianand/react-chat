import { Avatar, Menu, Spin, Typography } from 'antd'
import type { MenuProps } from 'antd'
import type { Conversation } from '../../types'
import { conversationApi } from '../../store/conversations.api';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { setActiveConversation } from '../../store/ui.slice';

const { Title } = Typography;

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function lastMessagePreview(conversation: Conversation): string {
  if (!conversation.lastMessage) return '';

  const last = conversation.lastMessage;
  return `${last.userId === 'u0' ? 'You: ' : ''}${last.text}`
}

function ConversationList() {
  const activeConversationId = useSelector((state: RootState) => state.ui.activeConversationId);
  const selectedKeys = [activeConversationId].filter(Boolean) as string[];

  const { data, isLoading } = conversationApi.useGetConversationsQuery('u0');

  const dispatch = useDispatch();

  const items: MenuProps['items'] = (data ?? []).map((uc) => ({
    key: uc.conversation!.id,
    label: (
      <div className={`conv-item${uc.read === false ? ' conv-item--unread' : ''}`}>
        <Avatar
          size={36}
          style={{ backgroundColor: uc.conversation!.color!, flexShrink: 0 }}
        >
          {getInitials(uc.conversation!.name!)}
        </Avatar>
        <div className="conv-item__body">
          <div className="conv-item__name-row">
            <span className="conv-item__name">{uc.conversation!.name}</span>
            {uc.read === false && <span className="conv-item__unread-dot" aria-hidden="true" />}
          </div>
          <span className="conv-item__preview">{lastMessagePreview(uc.conversation!)}</span>
        </div>
      </div>
    ),
  }))

  return (
    <div className="conv-sidebar">
      <div className="conv-sidebar__header">
        <Title level={4} className="conv-sidebar__title">
          Messages
        </Title>
      </div>
      {isLoading ? (
        <div className="conv-sidebar__loading">
          <Spin size="large" />
        </div>
      ) : (
        <Menu
          mode="inline"
          items={items}
          selectedKeys={selectedKeys}
          onClick={({ key }) => dispatch(setActiveConversation(key))}
          className="conv-sidebar__menu"
          styles={{ item: { height: 'auto', paddingTop: 2, paddingBottom: 2, marginBlock: 2 } }}
        />
      )}
    </div>
  )
}

export default ConversationList