export interface Message {
  id: string;
  role: "user" | "assistant";
  text?: string;
  image?: string;
}

// basic setup of message bubble component
// todo: logic implementation -> user's messages on the right with water drop like background, assistant's on the left
export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-lg shadow ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};
