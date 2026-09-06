import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { messageApi } from "../../store/messages.api";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const { TextArea } = Input;

function MessageComposer() {
  const [text, setText] = useState("");
  const [sendMessage, { isLoading }] = messageApi.useSendMessageMutation();
  const activeConversationId = useSelector(
    (state: RootState) => state.ui.activeConversationId,
  );

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage({
      conversationId: activeConversationId!,
      userId: "u0",
      text: trimmed,
    });
    setText("");
  };

  return (
    <div className="chat-composer">
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPressEnter={(e) => {
          if (!e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Escribe un mensaje..."
        autoSize={{ minRows: 1, maxRows: 4 }}
        maxLength={1000}
        className="chat-composer__input"
      />
      <Button
        type="primary"
        shape="circle"
        icon={<SendOutlined />}
        onClick={handleSend}
        loading={isLoading}
        disabled={!text.trim()}
        aria-label="Enviar mensaje"
      />
    </div>
  );
}

export default MessageComposer;
