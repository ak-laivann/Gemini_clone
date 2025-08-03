import { useAuthStore } from "../../store/authStore";
import { Avatar } from "antd";

export const Header = () => {
  const { isAuthenticated, signOut, mobileNumber } = useAuthStore();

  return (
    <header className="sticky top-0 z-10 mb-2 w-full px-4 py-3 bg-white flex justify-end items-center gap-4">
      {isAuthenticated ? (
        <>
          <button
            onClick={signOut}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
          >
            Sign Out
          </button>
          <Avatar children={mobileNumber?.split("-")[1].charAt(0)} />
        </>
      ) : null}
    </header>
  );
};
