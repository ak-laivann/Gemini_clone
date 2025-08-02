import { GeminiIcon } from "../../assets/GeminiIcon";

export interface Message {
  id: string;
  role: "user" | "assistant";
  text?: string;
  images?: string[];
}

export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-2 items-start gap-2`}
    >
      {!isUser && (
        <div className="w-6 h-6 mr-2 mt-3 text-gray-600">
          <GeminiIcon fontSize={25} />
        </div>
      )}

      <div className="relative max-w-[70%]">
        <div
          className={`p-3 rounded-xl shadow whitespace-pre-wrap ${
            isUser
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
          }`}
        >
          {message.text && <p className="text-sm">{message.text}</p>}
          {message.images &&
            message.images.length > 0 &&
            message.images.map((imageURL) => (
              <img
                src={imageURL}
                alt="chat"
                className="mt-2 rounded-lg max-w-full object-cover"
              />
            ))}
        </div>
      </div>
    </div>
  );
};
