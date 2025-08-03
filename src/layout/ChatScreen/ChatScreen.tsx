import { faker } from "@faker-js/faker";
import { useEffect, useRef, useState } from "react";
import { ChatInput, ChatDisplay } from "../../components";
import { useChatStore } from "../../store/chatStore";
import { Message } from "../../components/MessageBubble";

const PAGE_SIZE = 20;

export const ChatScreen = ({ newChat = false }: { newChat?: boolean }) => {
  const { addMessage, conversations, currentId, updateTitle } = useChatStore();
  const [isThinking, setIsThinking] = useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [triggerScroll, setTriggerScroll] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentConversation = conversations.find(
    (conv) => conv.id === currentId
  );
  const allMessages = currentConversation?.messages || [];
  const totalMessages = allMessages.length;
  const hasMore = totalMessages > displayedMessages.length;

  useEffect(() => {
    if (currentId) {
      const initialMessages = allMessages.slice(-PAGE_SIZE);
      setDisplayedMessages(initialMessages);
      setPage(1);
      setTriggerScroll((prev) => prev + 1);
    }
  }, [currentId, allMessages.length]);

  const loadMore = async () => {
    if (isLoadingOlder || !hasMore) return;

    setIsLoadingOlder(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newPage = page + 1;
    const startIndex = Math.max(0, totalMessages - newPage * PAGE_SIZE);
    const endIndex = totalMessages - (newPage - 1) * PAGE_SIZE;

    const olderMessages = allMessages.slice(startIndex, endIndex);

    setDisplayedMessages((prev) => [...olderMessages, ...prev]);
    setPage(newPage);
    setIsLoadingOlder(false);
  };

  const handleAIResponse = (
    convId: string | null,
    returnNow: boolean = false
  ) => {
    if (returnNow) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        setIsThinking(false);
      }
      return;
    }

    if (!convId) return;

    setIsThinking(true);

    timeoutRef.current = setTimeout(() => {
      const aiText = faker.lorem.sentences({ min: 1, max: 3 });
      const aiMessage = {
        id: Date.now().toString(),
        role: "assistant" as const,
        text: aiText,
        timeStamp: new Date().toLocaleString(),
      };

      addMessage(convId, aiMessage);
      setDisplayedMessages((prev) => [...prev, aiMessage]);
      setTriggerScroll((prev) => prev + 1);
      updateTitleIfFirstMessage(convId, aiText);

      setIsThinking(false);
      timeoutRef.current = null;
    }, 3000);
  };

  const updateTitleIfFirstMessage = (id: string, aiText: string) => {
    const conv = useChatStore.getState().conversations.find((c) => c.id === id);
    if (conv && conv.messages.length === 1) {
      const newTitle = aiText.split(".")[0].slice(0, 50).trim();
      updateTitle(id, newTitle || "New Conversation");
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      {newChat ? (
        <div className="flex-1 flex items-center justify-center px-4 md:px-8">
          <div className="ml-16 w-full max-w-3xl">
            <ChatInput onUserMessageSent={handleAIResponse} />
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto pb-4">
            <div className="w-full mt-12 mb-12 max-w-3xl mx-auto px-4 md:px-8 py-4 pt-4">
              <ChatDisplay
                isThinking={isThinking}
                messages={displayedMessages}
                isLoadingOlder={isLoadingOlder}
                loadMore={loadMore}
                hasMore={hasMore}
                triggerScroll={triggerScroll}
              />
            </div>
          </div>

          <div className="sticky z-10 bottom-0 w-full max-w-3xl mx-auto px-4 md:px-8 pt-4 bg-white">
            <ChatInput
              onUserMessageSent={handleAIResponse}
              isAiTyping={isThinking}
              onStop={() => handleAIResponse(null, true)}
            />
          </div>
        </>
      )}
    </div>
  );
};
