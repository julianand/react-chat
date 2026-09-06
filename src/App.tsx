import { ConfigProvider, Layout, Spin } from "antd";
import ChatWindow from "./components/chat/ChatWindow";
import ConversationList from "./components/chat/ConversationList";
import { Provider, useSelector } from "react-redux";
import "./App.css";
import { store, type RootState } from "./store/store";
import { useEffect } from "react";
import { startMessageSimulation } from "./store/simulation";

const { Sider, Content } = Layout;

function AppContent() {
  const activeConversationId = useSelector((store: RootState) => store.ui.activeConversationId);

  useEffect(() => {
    const sub = startMessageSimulation();
    return sub;
  }, [])

  return (
    <Layout className="chat-layout">
      <Sider width={300} theme="light" classNames={{ body: "chat-sider__body" }}>
        <ConversationList />
      </Sider>
      <Content>
        {activeConversationId ? (
          <ChatWindow />
        ) : (
          <div className="chat-empty">
            <Spin size="large" />
          </div>
        )}
      </Content>
    </Layout>
  );
}

function App() {
  return (
    <ConfigProvider>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
