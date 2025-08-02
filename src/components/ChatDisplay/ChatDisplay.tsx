import { useEffect, useRef } from "react";
import { GeminiIcon } from "../../assets/GeminiIcon";
import { useChatStore } from "../../store/chatStore";
import { MessageBubble } from "../MessageBubble";
import { Skeleton } from "antd";

export const ChatDisplay = ({
  isThinking = false,
}: {
  isThinking?: boolean;
}) => {
  const conversations = useChatStore((state) => state.conversations);
  const currentId = useChatStore((state) => state.currentId);
  const currentConversation = conversations.find(
    (conv) => conv.id === currentId
  );
  const messages = currentConversation?.messages || [];

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isThinking, currentId]);

  return (
    <div className="flex flex-col space-y-4">
      {messages
        .filter((i) => i.text || i.images?.length)
        .map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

      {isThinking && (
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 mt-2 text-gray-600">
            <GeminiIcon fontSize={25} />
          </div>
          <div className="max-w-[70%] p-3 rounded-xl">
            <p>Gemini is Typing...</p> <br />
            <Skeleton
              title={false}
              active={isThinking}
              paragraph={{ rows: 3, width: [300, 200, 300] }}
            />
          </div>
        </div>
      )}

      <div style={{ margin: 0, padding: 0 }} ref={bottomRef} />
    </div>
  );
};
