import { useAuthStore } from "../../store/authStore";

// Todo: If user name can be fetched after OTP verification, a profile picture with just the first name can be displayed.
export const Header = () => {
  const { isSignedIn, signIn, signOut } = useAuthStore();

  return (
    <header className="mb-2 w-full px-4 py-3 bg-white flex justify-end items-center gap-4 shadow-sm">
      {isSignedIn ? (
        <button
          onClick={signOut}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={signIn}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      )}
    </header>
  );
};
