import { ToastContainer } from "react-toastify";
import { Header, Sidebar } from "./components";
import { ChatScreen, AuthScreen } from "./layout";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      {!isAuthenticated ? (
        <AuthScreen />
      ) : (
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
      )}
      <ToastContainer />
    </>
  );
}
