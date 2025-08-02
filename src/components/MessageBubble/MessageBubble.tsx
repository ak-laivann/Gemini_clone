export interface Message {
  id: string;
  role: "user" | "assistant";
  text?: string;
  image?: string;
}

export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div className="relative max-w-[70%]">
        <div
          className={`p-3 rounded-xl shadow whitespace-pre-wrap ${
            isUser
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
          }`}
        >
          {message.text && <p className="text-sm">{message.text}</p>}
          {message.image && (
            <img
              src={message.image}
              alt="chat"
              className="mt-2 rounded-lg max-w-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};
