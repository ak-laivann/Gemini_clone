import { Sidebar } from "./components/Sidebar";
import { ChatScreen } from "./layout/ChatScreen";

export default function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatScreen />
    </div>
  );
}
