import { GeminiIcon } from "../../assets/GeminiIcon";
import { useState } from "react";
import ContentCopyOutlined from "@mui/icons-material/ContentCopyOutlined";
import CheckOutlined from "@mui/icons-material/CheckOutlined";

export interface Message {
  id: string;
  role: "user" | "assistant";
  timeStamp: string;
  text?: string;
  images?: string[];
}

export const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!message.text) return;
    await navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-2 items-start gap-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isUser && (
        <div className="w-6 h-6 mr-2 mt-3 text-gray-600">
          <GeminiIcon fontSize={25} />
        </div>
      )}

      <div className="relative max-w-[70%] group">
        <div
          className={`p-3 rounded-xl shadow whitespace-pre-wrap relative ${
            isUser
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
          }`}
        >
          {message.text && (
            <div className="relative">
              <p className="text-sm">{message.text}</p>

              {isHovered && (
                <button
                  onClick={handleCopy}
                  className="absolute top-0 right-0 text-xs text-gray-600 ml-20 hover:text-black"
                  title="Copy"
                >
                  {copied ? (
                    <CheckOutlined
                      fontSize={"small"}
                      className="text-green-600"
                    />
                  ) : (
                    <ContentCopyOutlined fontSize="small" />
                  )}
                </button>
              )}
            </div>
          )}

          {message.images &&
            message.images.length > 0 &&
            message.images.map((imageURL, i) => (
              <img
                key={i}
                src={imageURL}
                alt="chat"
                className="mt-2 rounded-lg max-w-full object-cover"
              />
            ))}
        </div>

        {message.timeStamp && (
          <p className={"text-xs text-black mt-1"}>{message.timeStamp}</p>
        )}
      </div>
    </div>
  );
};
