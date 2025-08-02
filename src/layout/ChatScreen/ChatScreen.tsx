import { ChatDisplay } from "../../components/ChatDisplay";
import { ChatInput } from "../../components/ChatInput";
import { useChatStore } from "../../store/chatStore";

export const ChatScreen = () => {
  const messages = useChatStore((state) => state.messages);

  return (
    <div className="flex-1 flex justify-center px-4 md:px-8">
      <div className="w-full max-w-3xl flex flex-col h-full">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full">
              <ChatInput />
            </div>
          </div>
        ) : (
          <>
            <ChatDisplay />
            <ChatInput />
          </>
        )}
      </div>
    </div>
  );
};
