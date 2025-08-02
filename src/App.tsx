import { Header, Sidebar } from "./components";
import { ChatScreen } from "./layout/ChatScreen";

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <ChatScreen />
      </div>
    </div>
  );
}
