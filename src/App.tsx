import { ConfigProvider, Layout } from "antd";
import ChatWindow from "./components/chat/ChatWindow";
import ConversationList from "./components/chat/ConversationList";
import { Provider, useSelector } from "react-redux";
import "./App.css";
import { store, type RootState } from "./store/store";

const { Sider, Content } = Layout;

function AppContent() {
  const activeConversationId = useSelector(
    (store: RootState) => store.ui.activeConversationId,
  );

  return (
    <Layout className="chat-layout">
      <Sider
        width={300}
        theme="light"
        classNames={{ body: "chat-sider__body" }}
      >
        <ConversationList />
      </Sider>
      <Content>{activeConversationId && <ChatWindow />}</Content>
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
