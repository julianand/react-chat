import { Avatar } from 'antd'
import type { Message } from '../../types'

const ME_NAME = 'Tú'
const ME_COLOR = '#722ed1'

interface MessageRowProps {
  message: Message
  peerName: string
  peerColor: string
}

const WEEKDAY_FORMAT = new Intl.DateTimeFormat('es', { weekday: 'short' })
const TIME_FORMAT = new Intl.DateTimeFormat('es', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  return `${WEEKDAY_FORMAT.format(date)} ${TIME_FORMAT.format(date)}`
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function MessageRow({ message, peerName, peerColor }: MessageRowProps) {
  const isMine = message.userId === 'u0'
  const avatar = (
    <Avatar style={{ backgroundColor: isMine ? ME_COLOR : peerColor }} size={36}>
      {getInitials(isMine ? ME_NAME : peerName)}
    </Avatar>
  )

  return (
    <div className={`chat-row ${isMine ? 'chat-row--mine' : 'chat-row--other'}`}>
      {!isMine && avatar}
      <div className="chat-bubble">
        <span className="chat-bubble__text">{message.text}</span>
        <span className="chat-bubble__time">{formatTimestamp(message.timestamp)}</span>
      </div>
      {isMine && avatar}
    </div>
  )
}

export default MessageRow