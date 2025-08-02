import { useChatStore } from "../../store/chatStore";
import { MessageBubble } from "../MessageBubble";

// basic setup of chat display component -> integration with the chats to be implemented
export const ChatDisplay = () => {
  const messages = useChatStore((state) => state.messages);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
};
