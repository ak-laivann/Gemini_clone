import { ChatDisplay, ChatInput } from "../../components";
export const ChatScreen = () => {
  return (
    <div className="flex flex-col flex-1">
      <ChatDisplay />
      <ChatInput />
    </div>
  );
};
