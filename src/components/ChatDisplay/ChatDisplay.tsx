import { useEffect, useRef, useLayoutEffect } from "react";
import { GeminiIcon } from "../../assets/GeminiIcon";
import { MessageBubble, Message } from "../MessageBubble";
import { Skeleton } from "antd";

interface ChatDisplayProps {
  isThinking?: boolean;
  messages: Message[];
  isLoadingOlder: boolean;
  loadMore: () => void;
  hasMore: boolean;
  triggerScroll: number;
}

export const ChatDisplay = ({
  isThinking = false,
  messages,
  isLoadingOlder,
  loadMore,
  hasMore,
  triggerScroll,
}: ChatDisplayProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const prevScrollHeightRef = useRef(0);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (triggerScroll > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [triggerScroll]);

  useLayoutEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (!scrollElement) return;

    if (isInitialLoad.current) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
      isInitialLoad.current = false;
      return;
    }

    const newScrollHeight = scrollElement.scrollHeight;
    const oldScrollHeight = prevScrollHeightRef.current;
    const heightDifference = newScrollHeight - oldScrollHeight;

    if (heightDifference > 0 && !isThinking) {
      scrollElement.scrollTop += heightDifference;
    }

    prevScrollHeightRef.current = newScrollHeight;
  });

  useEffect(() => {
    if (!topRef.current || !hasMore || isLoadingOlder) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(topRef.current);
    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadMore, isLoadingOlder]);

  return (
    <div className="flex flex-col space-y-4" ref={scrollContainerRef}>
      {isLoadingOlder && (
        <div className="flex justify-center py-4">
          <Skeleton
            active
            paragraph={{ rows: 2, width: ["100%", "80%"] }}
            className="w-full max-w-sm"
          />
        </div>
      )}

      {hasMore && !isLoadingOlder && (
        <div ref={topRef} className="py-4 flex justify-center">
          <p
            className="text-gray-500 font-medium cursor-pointer"
            onClick={loadMore}
          >
            Load more messages...
          </p>
        </div>
      )}

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
