import { Header, Sidebar } from "./components";
import { ChatScreen } from "./layout/ChatScreen";

export default function App() {
  return (
    <div className="h-screen overflow-hidden relative">
      <div
        className="fixed top-0 bottom-0 left-0 z-20 bg-white border-r"
        style={{ width: "auto" }}
      >
        <Sidebar />
      </div>

      <div className="flex flex-col h-full ml-52">
        <Header />
        <ChatScreen />
      </div>
    </div>
  );
}
