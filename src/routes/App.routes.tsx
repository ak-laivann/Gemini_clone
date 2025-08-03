import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { ChatScreen } from "../layout";
import { Header, Sidebar, SearchScreen } from "../components";

const MainLayout = () => {
  return (
    <div className="h-screen overflow-hidden relative">
      <div className="fixed top-0 bottom-0 left-0 z-20 bg-white border-r">
        <Sidebar />
      </div>

      <div className="flex flex-col h-full ml-52">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/app" replace />} />
        <Route path="app" element={<ChatScreen newChat={true} />} />
        <Route path="app/:id" element={<ChatScreen newChat={false} />} />
        <Route path="app/search" element={<SearchScreen />} />
        <Route path="*" element={<Navigate to="/app" replace />} />
      </Route>
    </Routes>
  );
};
